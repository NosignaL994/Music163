import React, { useCallback } from "react"

export default function MemoBtn ({type="button",onClick,children,className}) {
    const memoCallback = useCallback(onClick,[onClick])
    return React.createElement(type,{className,onClick:memoCallback},children)
}