import React, { Component } from 'react'

const Parent = (props: any) => {
  const { children } = props;
  const newChildren = React.Children.map(children, (child, index) => {
    console.log({ child, index })
    return child;
  });
  return (<>
    {
      newChildren
    }
  </>)
}

export class ChildSample extends Component {
  render() {
    return (
      <div>
        <Parent>
          <div key={"1"}>div1</div>
          <div key={"2"}>div2</div>
          <div key={"3"}>div3</div>
          <>
            <div key={"2"}>div4</div>
            <div key={"3"}>div5</div>
          </>
        </Parent>
      </div>
    )
  }
}

export default ChildSample