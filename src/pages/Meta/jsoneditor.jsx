import React, { PureComponent } from 'react'
import JSONEditor from 'jsoneditor'
import PropTypes from 'prop-types'
import { Button } from 'antd';
import 'jsoneditor/dist/jsoneditor.css'
import styles from './index.less';
 
/**
 * JsonEditor
 * @param {object} json 用于绑定的json数据
 * @param {func} onChange 变化时的回调
 * @param {func} getJson 为外部提供回去json的方法
 * @param {func} onError 为外部提供json格式错误的回调
 * @param {string} themeBgColor 为外部暴露修改主题色
 */
class JsonEditor extends PureComponent {
  onChange = () => {
    let value = this.jsoneditor.get()
    this.props.onChange && this.props.onChange(value)
    this.viewJsoneditor.set(value)
  }
 
  getJson = () => {
    this.props.getJson && this.props.getJson(this.jsoneditor.get())
  }
 
  onError = (errArr) => {
    this.props.onError && this.props.onError(errArr)
  }
 
  initJsonEditor = () => {
    const options = {
      mode: 'code',
      history: true,
      onChange: this.onChange,
      onValidationError: this.onError
    };
 
    this.jsoneditor = new JSONEditor(this.container, options)
    this.jsoneditor.set(this.props.value)
  }
 
  initViewJsonEditor = () => {
    const options = {
      mode: 'view'
    };
 
    this.viewJsoneditor = new JSONEditor(this.viewContainer, options)
    this.viewJsoneditor.set(this.props.value)
  }
 
  componentDidMount () {
    this.initJsonEditor()
    this.initViewJsonEditor()
    // 设置主题色
    // this.container.querySelector('.jsoneditor-menu').style.backgroundColor = this.props.themeBgColor
    // this.container.querySelector('.jsoneditor').style.border = `thin solid ${this.props.themeBgColor}`
    // this.viewContainer.querySelector('.jsoneditor-menu').style.backgroundColor = this.props.themeBgColor
    // this.viewContainer.querySelector('.jsoneditor').style.border = `thin solid ${this.props.themeBgColor}`
  }
 
  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy()
      this.viewJsoneditor.destroy()
    }
  }
 
  componentDidUpdate() {
    if(this.jsoneditor) {
      this.jsoneditor.update(this.props.value)
      this.viewJsoneditor.update(this.props.value)
    }
  }
 
  render() {
    return (
    <div>
        <div>
            <Button onClick={this.getJson}>更新</Button>
        </div>
      <div className={styles.jsonEditWrap}>
        <div className={styles.jsoneditorReactContainer} ref={elem => this.container = elem} />
        <div className={styles.jsoneditorReactContainer} ref={elem => this.viewContainer = elem} />
      </div>
    </div>
    );
  }
}
 
JsonEditor.propTypes = {
  json: PropTypes.object,
  onChange: PropTypes.func,
  getJson: PropTypes.func,
  onError: PropTypes.func,
  themeBgColor: PropTypes.string
}
 
export default JsonEditor