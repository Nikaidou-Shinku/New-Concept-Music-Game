import { _decorator, Component, Node, GraphicsComponent, Graphics, Prefab, director, instantiate, tween, Vec3, input, Input, EventKeyboard, KeyCode, game, AudioSource, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Thu Dec 23 2021 00:08:13 GMT+0800 (中国标准时间)
 * Author = yurzhang
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/Scripts/Main/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Game')
export class Game extends Component {
    @property({type: Node})
    mainGame = null;

    @property({type: Graphics})
    BackgroundGridLine = null;

    @property({type: Label})
    scoreLabel = null;
    @property({type: Label})
    comboLabel = null;

    @property({type: Node})
    tapAudioNode = null;
    @property({type: Node})
    errAudioNode = null;

    tapAudioSource = null;
    errAudioSource = null;

    score = 0;
    comboNum = 0;

    randomInt(min: number, max: number): number {
        const range = max - min;
        const res = Math.random();
        return Math.round(res * range) + min;
    }

    GridLines = [];
    drawGridLine () {
        const g = this.BackgroundGridLine.getComponent(Graphics);
        g.lineWidth = 5;
        g.strokeColor.fromHEX('#ff0000');

        for (let x = -50; x >= -450; x -= 100) { // Draw column
            this.GridLines.push({
                from: {
                    x: x,
                    y: -360
                },
                to: {
                    x: x,
                    y: 360
                }
            });
        }

        for (let y = -360; y <= 360; y += 100) { // Draw row
            this.GridLines.push({
                from: {
                    x: -450,
                    y: y
                },
                to: {
                    x: -50,
                    y: y
                }
            });
        }

        this.GridLines.forEach((line) => {
            g.moveTo(line.from.x, line.from.y);
            g.lineTo(line.to.x, line.to.y);
        });

        g.stroke();
    }

    @property({type: Prefab})
    blockPrefab = null;

    blockList = [];
    drawBlock (pos: number, height: number = 590) {
        const node = instantiate(this.blockPrefab);
        node.pos = pos;
        node.posh = height;
        node.parent = this.mainGame;
        node.setPosition((pos - 4) * 100, height, 0);
        return node;
    }

    addBlock () {
        let tempBlock = this.blockList.shift();
        tempBlock.destroy();

        this.blockList.forEach((tempBlock) => {
            tempBlock.posh -= 100;
            const newTime = (tempBlock.position.y - tempBlock.posh) / 1000;
            const newPos = new Vec3(tempBlock.position);
            newPos.y = tempBlock.posh;
            tween(tempBlock).to(newTime, { position: newPos }).start();
        });
        
        const pos = this.randomInt(0, 3);
        tempBlock = this.drawBlock(pos);
        this.blockList.push(tempBlock);
    }

    initBlocks () {
        for (let i = 0; i != 10; ++ i) {
            const pos = this.randomInt(0, 3);
            const tempBlock = this.drawBlock(pos, i * 100 - 310);
            this.blockList.push(tempBlock);
        }
    }

    addCombo () {
        ++ this.comboNum;
        this.updateCombo();
    }

    clearCombo () {
        this.comboNum = 0;
        this.comboLabel.string = "";
    }

    press(pos: number) {
        if (pos === this.blockList[0].pos) {
            this.tapAudioSource.play();
            this.addCombo();
            this.score += Math.min(this.comboNum, 5);
            this.updateScore(this.score);
            this.addBlock();
        } else {
            this.clearCombo();
            this.errAudioSource.play();
        }
    }

    setComboBigAndSmall () {
        this.comboLabel.fontSize = 50;
        tween(this.comboLabel)
            .to(0.05, { fontSize: 80 })
            .to(0.1, { fontSize: 50 })
            .start();
    }

    updateScore (score: number) {
        this.scoreLabel.string = "分数：" + score;
    }
    updateCombo () {
        this.comboLabel.string = this.comboNum + " COMBO!";
        this.setComboBigAndSmall();
    }

    start () {
        this.drawGridLine();
        this.initBlocks();
        this.updateScore(0);
        this.comboLabel.string = "";
    }

    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.tapAudioSource = this.tapAudioNode.getComponent(AudioSource);
        this.errAudioSource = this.errAudioNode.getComponent(AudioSource);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.press(0);
                break;
            case KeyCode.KEY_S:
                this.press(1);
                break;
            case KeyCode.KEY_J:
                this.press(2);
                break;
            case KeyCode.KEY_K:
                this.press(3);
                break;
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
