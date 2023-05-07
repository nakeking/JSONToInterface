#### JSON 转 TypeScript Interface 的Web应用 

<!-- Badge -->
[![Author](https://img.shields.io/badge/Author-nakeking-red "Author")](https://github.com/nakeking "Nakeking")


#### 介绍
前端使用 umi + React，后端使用Node.js。
在Nodejs中和ChatGPT进行通信。


#### 示例
```
\\ json
{
    "name": "string",
    "info": {
        "option": {
            "age": "数值类型，可选",
            "intelligence_quotient": 250
        }
    },
    "info2": "和info一样的类型"
}

\\ typescript Interface
interface Option {
  age?: number,
  intelligence_quotient: number
}

interface Info {
  option: Option
}

interface MyObject {
  name: string,
  info: Info,
  info2: Info
}

```

#### 运行
##### Install（客户端）

```sh
pnpm install
```

##### Usage
```sh
npm run dev
```

##### Install（服务端）
```sh
// 进入server文件夹
// 新建 .env 文件
// 设置 OPENAI_API_KEY = "你的密钥"

// yarn install
```

##### Usage
```sh
npm run start
```