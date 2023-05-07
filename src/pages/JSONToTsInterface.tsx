import { Button, Spin, message } from "antd";
import { useState } from "react";

import Editor from "@monaco-editor/react"

import './JSONToInterface.less';

import {
  DeleteFilled,
  CopyFilled
} from '@ant-design/icons';

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function JSONToInterface() {
  const [value, setValue] = useState<string | undefined>()
  const [output, setOutput] = useState<string>("")

  const handleSubmitJSON = () => {
    setLoading(true)

    fetch("/api/convert", {
      method: "POST",
      body: JSON.stringify({
        value,
      }),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
    }).then(
      (res) => res.json()
    ).then((data) => {
      if( data.code !== 0) {
        message.error(data.errMsg);
        return;
      }

      setOutput(data.response);
      console.log(data);

    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const [loading, setLoading] = useState(false);

  return (
    <div className="JSONToInterface">
      { loading ? <div className="fullPage"><Spin /></div> : null}
      <div className="json box line">
        <div className="top">
            <div className="title">JSON</div>
            <div className="action">
              <Button type="primary" onClick={handleSubmitJSON}>Run</Button>
              <DeleteFilled style={{color: "red"}} onClick={() => setValue("")} />
            </div>
        </div>
        <Editor language="json" value={value} onChange={(value) => setValue(value)} />
      </div>
      <div className="interface box">
        <div className="top">
            <div className="title">Typescript Interface</div>
            <div className="action">
              <CopyToClipboard text={output} onCopy={() => message.success("复杂成功")}>
                <CopyFilled style={{color: "blue"}} />
              </CopyToClipboard>
            </div>
        </div>
        <Editor 
          language="typescript" 
          value={output} 
          options={{
            theme: "vs",
            domReadOnly: true,
            readOnly: true,
          }}
          onChange={(value) => setOutput(value as string)} />
      </div>
    </div>
  )
}