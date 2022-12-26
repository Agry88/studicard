import { PieChart } from "react-native-chart-kit"
import generateRandomColor from "../../utils/gernerateRandomColor"
import { CardSetFocusInfo } from "../../types";

type Props = {
    data: CardSetFocusInfo[]
    height: number
    width: number
}

export default function MyPieChart(props: Props) {
    
    const chartDataWithColorAndFont = props.data.map((data: any) => {
        return {
            ...data,
            color: generateRandomColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    })


    return (
        <PieChart
            data={chartDataWithColorAndFont}
            width={props.width}
            height={props.height}
            chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="focusSeconds"
            backgroundColor="transparent"
            paddingLeft="20"
        />
    )
}