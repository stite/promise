/*
 * @Author: XiaoMing 
 * @Date: 2021-05-14 15:17:48 
 * @Last Modified by: Xiao.Ming
 * @Last Modified time: 2021-05-24 16:51:09
 */


// 构造函数
class promise {
  /**
   *
   * @static
   * @PENDING 等待
   * @FULFILLED 成功
   * @REJECTED 拒绝
   */
  PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  // 成功回调
  static onFulfilled = []
  // 失败回调
  static onRejected = []
  constructor(execution) {
    this.state = promise.PENDING;

    // 回调函数执行
    execution(this._resolve.bind(this), this._reject.bind(this))
  }
  _resolve(data) {
    // 改变状态
    this.state = promise.FULFILLED;
    this.fulfilled = data;
    promise.onFulfilled.forEach(item => {
      item(data)
    })
  }
  _reject(data) {
    // 改变状态
    this.state = promise.REJECTED;
    this.rejected = data;
    promise.onRejected.forEach(item => {
      item(data)
    })
  }
  then(onFulfilled, onRejected) {
    if (this.state === promise.FULFILLED) {
      typeof onFulfilled == 'function' && onFulfilled(this.fulfilled)
    }
    if (this.state === promise.REJECTED) {
      typeof onRejected == 'function' && onRejected(this.rejected)
    }
    if (this.state === promise.PENDING) {
      typeof onFulfilled == 'function' && promise.onFulfilled.push(onFulfilled)
      typeof onRejected == 'function' && promise.onRejected.push(onRejected)
    }
  }
  catch (onRejected) {
    if (this.state === promise.FULFILLED) {
      typeof onFulfilled == 'function' && onFulfilled(this.fulfilled)
      typeof onRejected == 'function' && onRejected(this.rejected)
    }
    if (this.state === promise.REJECTED) {
      typeof onRejected == 'function' && onRejected(this.rejected)
    }
    if (this.state === promise.PENDING) {
      typeof onFulfilled == 'function' && promise.onFulfilled.push(onFulfilled)
    }
  }
}