export default function Log({ turns }) {

    return <ol id={"log"}>{turns.map((turn,index) => {
        return <li key={`${turn.square.row}${turn.square.col}`}>Player:{turn.player} step:{turn.square.row+1}:{turn.square.col+1}</li>
    })}</ol>;
}
