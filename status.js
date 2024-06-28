//状态栏

const statusBanner = {
    strengthSpan: document.createElement("span"),
    moodSpan: document.createElement("span"),
    spiritSpan: document.createElement("span"),
    moneySpan: document.createElement("span"),
    strT: "体力：",
    mooT: "心情：",
    spiT: "精力：",
    monT: "金钱：",
    createDiv: function(player) {
        //初始化
        this.strengthSpan.textContent = this.strT + player.strength.toString();
        this.moodSpan.textContent = this.mooT + player.mood.toString();
        this.spiritSpan.textContent = this.spiT + player.spirit.toString();
        this.moneySpan.textContent = this.monT + player.money.toString();

        let div = document.createElement("div");
        div.appendChild(this.strengthSpan);
        div.appendChild(this.moodSpan);
        div.appendChild(this.spiritSpan);
        div.appendChild(this.moneySpan);
        div.className = "statusBar";

        return div;
    },
    updateDiv: function(player) {
        this.strengthSpan.textContent = this.strT + player.strength.toString();
        this.moodSpan.textContent = this.mooT + player.mood.toString();
        this.spiritSpan.textContent = this.spiT + player.spirit.toString();
        this.moneySpan.textContent = this.monT + player.money.toString();
    }
}