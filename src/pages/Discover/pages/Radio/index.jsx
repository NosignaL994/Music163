import RadioCat from "./components/RadioCat"
import { Skeleton } from "antd"

export default function Radio () {
    return <Skeleton loading={false}>
        <RadioCat/>
    </Skeleton>
}