/** 发布订阅控制器 */
class EventEmitter {
    /** 事件池 */
    eventPoll: any = {};

    /** 注册事件 */
    on(event: string, callback: any) {
        if (this.eventPoll[event]) {
            this.eventPoll[event]?.push?.(callback);
        } else {
            this.eventPoll[event] = [callback];
        }
    }

    /** 执行事件 */
    emit(event: string, ...args: any) {
        if (this.eventPoll[event]) {
            this.eventPoll[event]?.forEach?.((cb: any) => cb?.(...args));
        }
    }

    /** 注销事件 */
    off(event: string) {
        if (this.eventPoll[event]) {
            delete this.eventPoll[event];
        }
    }
}

let singleEmitter: EventEmitter | null = null;
/** 获取发布订阅控制器 */
export const getEventEmitter = () => {
    if (!singleEmitter) {
        singleEmitter = new EventEmitter();
    }
    return singleEmitter;
};

/** store数据改变事件名 */
export const STORE_STATE_CHANGE_EVENT = "STORE_STATE_CHANGE_EVENT";
