~function () {
    // let sk = getFile()
    let row = document.querySelector('.container')
    let send = document.querySelector('.send')
    let input = document.querySelector('.inputText')
    let message=[]
    let inputData;

    hander()



    //获取数据
    function getdata() {
        let xhr = new XMLHttpRequest();
        // let url = "https://api.openai.com/v1/chat/completions";
        let url = "/api/resources/proxys";
        // let url = "localhost:3000/resources/proxys";

        xhr.open("POST", url, true);
        message.push({"role":"user","content":inputData})
      
        xhr.onreadystatechange = function () {
            // console.log("1",message)
            if (xhr.readyState === 4 && xhr.status === 200) {

             
                let json = JSON.parse(xhr.responseText);
                let response = String(json.result);

                message.push({"role":"system","content":response})

                let index = 0
                answer.innerHTML = ''
                //清除内容开头的换行符
                let lre = /^[\r\n]+/ig
                response = response.replace(lre, '')
                // 创建一个定时器，每隔一段时间打印一个字符
                let timer = setInterval(function () {
                    answer.innerHTML += response[index];
                    index++;

                    // 当打印完成时，清除定时器
                    if (index >= response.length) {
                        clearInterval(timer);
                    }
                },
                    50); // 每隔50毫秒打印一个字符
            }
        }
         
       

        //新增上下文功能
        // console.log("12",message)
        let data = JSON.stringify({           
            "messages":message,                    
        })  
        xhr.send(data)
    }




    //渲染页面
    function runder() {
        inputData = String(input.value)
        //处理数据
        inputData = parseData(inputData)

        //判断输入内容是否为空
        if (inputData != '') {
            //创建元素
            let request = document.createElement('div')
            request.className = 'request'

            let question = document.createElement('p')
            question.className = 'question'
            question.innerText = `${input.value}`

            
            input.value = ''
            request.appendChild(question)
            row.appendChild(request)
            request.style.height = `${question.offsetHeight}px`

            response = document.createElement('div')
            response.className = 'response'

            answer = document.createElement('p')
            answer.className = 'answer'
            answer.innerText = '思考中，请稍等………'
            response.appendChild(answer)
            row.appendChild(response)
        }

    }
    //功能事件
    function hander() {
        //添加点击事件
        send.onclick = function () {
            runder()
            if (inputData != '') {
                getdata()
            }
    
        }
        //添加定时器判断输入框是否有内容 更改输入框颜色
        let inputTime = setInterval(() => {
            let result = parseData(input.value)
            if (result) {
                send.style.backgroundColor = '#333333';
            }else{
                send.style.backgroundColor = '#ededed'
            }
        }, 300);
    }


    //处理数据 清除文中换行符
    function parseData(data) {
        let reN = /^[\r\n]+/ig
        
        let reR = /[\r\n]+$/ig
    
        // 正则匹配文章中的换行符
        if (data.match(reN)) {
            // 如果有换行符，则替换为空
            data = data.replaceAll(reN, "");
        }
        // 正则匹配文章中的回车符
        if (data.match(reR)) {
            // 如果有回车符，则替换为空
            data = data.replaceAll(reR, "");
        }
        return data

    }


}()