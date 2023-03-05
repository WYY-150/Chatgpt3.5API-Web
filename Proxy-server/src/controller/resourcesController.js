const path = require('path')
const axios =require('axios')
const { sk } = require('../config/default')

const { NullError } = require('../constant/errorType')

class ResourcesController {
  async getres(ctx, next) {
    let responseText
    let reqInstance = axios.create({
      Headers:{
        'Content-Type': 'application/json',
        Authorization : `Bearer ${sk}`,
      },
      })
      
        
    try {

      let {model,messages,max_tokens,temperature,top_p,frequency_penalty,presence_penalty}=ctx.request.body

      console.log(model,messages,max_tokens,temperature,top_p,frequency_penalty,presence_penalty,sk)     
      try{
        responseText = await reqInstance.post('https://api.openai.com/v1/chat/completions', {
        "model":  model,
        "messages":message,
        "max_tokens": max_tokens,
        "temperature":temperature,
        "top_p": top_p,
        "frequency_penalty": frequency_penalty,
        "presence_penalty": presence_penalty,        
      })
    
    }catch(e){
      console.error(e)
    }
      let res=JSON.parse(responseText)
      console.log(res)
      ctx.body = {
         code: '200',
         responseText

      }
    } catch (error) {
      console.error(error)
      return ctx.app.emit('error', NullError, ctx)
    }
  }
}
module.exports = new ResourcesController()
