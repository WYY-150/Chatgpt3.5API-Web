const path = require('path')
const axios =require('axios')
const { sk } = require('../config/default')

const { NullError } = require('../constant/errorType')

class ResourcesController {
  async getres(ctx, next) {
    let responseText
    let reqInstance = axios.create({
      headers:{
        'Content-Type': 'application/json',
        Authorization : `Bearer ${sk}`,
      },
      })
      
   
    try {
      let { messages} = ctx.request.body;
      try {
        responseText = await reqInstance.post('https://api.openai.com/v1/chat/completions', {          
          "model":"gpt-3.5-turbo",
          "messages":messages,
          "max_tokens":2048,
          "temperature":0.5,
          "top_p":1,
          "frequency_penalty":0,
          "presence_penalty":0          
        });
        let res = responseText.data;
        // console.log("1",res.choices[0].message.content);
        let result=res.choices[0].message.content
        // console.log("1",result);
        ctx.body = {
          code: 200,
          result
        };
      } catch (e) {
        console.error(e);
        return ctx.app.emit('error', new NullError, ctx);
      }
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error', NullError, ctx);
    }
  }
}
module.exports = new ResourcesController()