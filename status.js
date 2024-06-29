//状态栏

const statusBanner = {
    strengthSpan: document.createElement("span"),
    moodSpan: document.createElement("span"),
    spiritSpan: document.createElement("span"),
    moneySpan: document.createElement("span"),
    strspan1: document.createElement("span"),
    strspan2: document.createElement("span"),
    moospan1: document.createElement("span"),
    moospan2: document.createElement("span"),
    spispan1: document.createElement("span"),
    spispan2: document.createElement("span"),
    monspan1: document.createElement("span"),
    monspan2: document.createElement("span"),
    strT: "体力：",
    mooT: "心情：",
    spiT: "精力：",
    monT: "金钱：",
    createDiv: function(player) {
        //初始化
        this.strspan1.textContent = this.strT;
        this.moospan1.textContent = this.mooT;
        this.spispan1.textContent = this.spiT;
        this.monspan1.textContent = this.monT;
        
        this.strspan2.textContent = player.strength.toString();
        this.moospan2.textContent = player.mood.toString();
        this.spispan2.textContent = player.spirit.toString();
        this.monspan2.textContent = player.money.toString();

        this.strengthSpan.appendChild(this.strspan1);
        this.strengthSpan.appendChild(this.strspan2);
        this.moodSpan.appendChild(this.moospan1);
        this.moodSpan.appendChild(this.moospan2);
        this.spiritSpan.appendChild(this.spispan1);
        this.spiritSpan.appendChild(this.spispan2);
        this.moneySpan.appendChild(this.monspan1);
        this.moneySpan.appendChild(this.monspan2);

        this.strengthSpan.className = "status-span";
        this.moodSpan.className = "status-span";
        this.spiritSpan.className = "status-span";
        this.moneySpan.className = "status-span";

        let div = document.createElement("div");
        div.appendChild(this.strengthSpan);
        div.appendChild(this.moodSpan);
        div.appendChild(this.spiritSpan);
        div.appendChild(this.moneySpan);
        div.className = "statusBar";

        this.strspan2.className = "plain-status-span";
        this.moospan2.className = "plain-status-span";
        this.spispan2.className = "plain-status-span";
        this.monspan2.className = "plain-status-span";

        return div;
    },
    updateDiv: function(player) {
        this.strspan2.textContent = player.strength.toString();
        this.moospan2.textContent = player.mood.toString();
        this.spispan2.textContent = player.spirit.toString();
        this.monspan2.textContent = player.money.toString();
        if (player.strength < 10) {
            this.strspan2.className = "warning-status-span";
        } else {
            this.strspan2.className = "plain-status-span";
        }
        if (player.mood < 10) {
            this.moospan2.className = "warning-status-span";
        } else {
            this.moospan2.className = "plain-status-span";
        }
        if (player.spirit < 10) {
            this.spispan2.className = "warning-status-span";
        } else {
            this.spispan2.className = "plain-status-span";
        }
        if (player.money < 500) {
            this.monspan2.className = "warning-status-span";
        } else {
            this.monspan2.className = "plain-status-span";
        }

    }
}
