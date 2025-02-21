const gameStatC = {
    //need to make this component dynamic.
    props : {
        scores: {
            type: Object,
        },
        flips: {
            type: Object,
        },
        turn: {
            type: Number
        }
    },
    template: `
    <div id="gamestat">
        <div id="player1">
            <p>
                <span>Player 1:</span>&nbsp;<span class="score">  {{ scores[1] }}</span>
            </p>
            <p>
                <span>{{ flips[1] }}&nbsp;flips</span>
            </p>
        </div>
        <div id="stat">
            <span id="playerWrapper">Player {{ turn }}</span>
        </div>
        <div id="player2">
            <p>
                <span>Player 2:</span>&nbsp;<span class="score"> {{ scores[2] }}</span>
            </p>
            <p>
                <span>{{ flips }}&nbsp;flips</span>
            </p>
        </div>
    </div>`
}