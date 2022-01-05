import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

/**
 * Predefined variables
 * Name = startGame
 * DateTime = Thu Dec 23 2021 00:03:31 GMT+0800 (中国标准时间)
 * Author = yurzhang
 * FileBasename = startGame.ts
 * FileBasenameNoExtension = startGame
 * URL = db://assets/Scripts/Start/startGame.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('startGame')
export class startGame extends Component {
    gotoMain () {
        director.loadScene("Main");
    }
    gotoTitle () {
        director.loadScene("Start");
    }
    gotoHelp () {
        director.loadScene("Help");
    }
}
