import { _decorator, Component, Label, Node, AudioSource } from 'cc';
import { com } from '../Common';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = endGame
 * DateTime = Wed Jan 05 2022 10:44:21 GMT+0800 (中国标准时间)
 * Author = yurzhang
 * FileBasename = endGame.ts
 * FileBasenameNoExtension = endGame
 * URL = db://assets/Scripts/Result/endGame.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('endGame')
export class endGame extends Component {
    @property({type: Label})
    scoreLabel = null;

    @property({type: Node})
    endAudioNode = null;

    endAudioSource = null;

    onLoad () {
        this.endAudioSource = this.endAudioNode.getComponent(AudioSource);
    }

    start () {
        this.scoreLabel.string = '得分：' + com.lastScore;
        this.endAudioSource.play();
    }
}
