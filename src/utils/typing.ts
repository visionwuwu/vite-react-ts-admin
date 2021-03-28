export interface TypingOptions {
  source: HTMLElement
  output: HTMLElement
  delay: number
  done?: () => void
}

export interface TypingStatic {
  new (opts: TypingOptions): TypingClass
}

export interface TypingClass {
  opts: TypingOptions
  init(): void
  convert(dom: HTMLElement, arr: Array<any>): Array<any>
  print(dom: HTMLElement, val: any, callback: () => void): void
  play(ele: HTMLElement): void
  start(): void
}

interface ChainProps {
  parent: ChainProps | null
  dom: HTMLElement
  val: any[]
}

class Typing {
  private opts: TypingOptions
  source: HTMLElement
  output: HTMLElement
  delay: number
  chain: ChainProps

  constructor(opts: TypingOptions) {
    this.opts = opts || {}
    this.source = opts.source
    this.output = opts.output
    this.delay = opts.delay || 120
    this.chain = {
      parent: null,
      dom: this.output,
      val: [],
    }
    if (!(typeof this.opts.done === 'function')) {
      this.opts.done = function () {
        return
      }
    }
  }

  init() {
    //初始化函数
    this.chain.val = this.convert(this.source, this.chain.val)
  }

  convert(dom: HTMLElement | ChildNode, arr: any[]) {
    //将dom节点的子节点转换成数组，
    const children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      const node = children[i]
      if (node.nodeType === 3) {
        arr = arr.concat((node.nodeValue as string).split('')) //将字符串转换成字符串数组，后面打印时才会一个一个的打印
      } else if (node.nodeType === 1) {
        let val: any[] = []
        val = this.convert(node, val)
        arr.push({
          dom: node,
          val: val,
        })
      }
    }
    return arr
  }

  print(dom: HTMLElement, val: any, callback: () => void) {
    setTimeout(function () {
      dom.appendChild(document.createTextNode(val))
      callback()
    }, this.delay)
  }

  play(ele: ChainProps) {
    //当打印最后一个字符时，动画完毕，执行done
    if (!ele.val.length) {
      if (ele.parent) this.play(ele.parent)
      else this.opts.done && this.opts.done()
      return
    }
    const current = ele.val.shift() //获取第一个元素，同时删除数组中的第一个元素
    if (typeof current === 'string') {
      this.print(ele.dom, current, () => {
        this.play(ele) //继续打印下一个字符
      })
    } else {
      const dom = current.dom.cloneNode() //克隆节点，不克隆节点的子节点，所以不用加参数true
      ele.dom.appendChild(dom)
      this.play({
        parent: ele,
        dom,
        val: current.val,
      })
    }
  }

  start() {
    this.init()
    this.play(this.chain)
  }
}

export default Typing
