export function stringToNodes(keyWord,item) {
  let nodes = []
  if(item.toUpperCase().startsWith(keyWord.toUpperCase())) {
    const key1 = item.slice(0,keyWord.length)
    const key2 = item.slice(keyWord.length)
    const node1 = {
      name: 'span',
      attrs: {
        style: 'color: #26ce8a;'
      },
      children: [{
        type: 'text',
        text: key1
      }]
    }
    const node2 = {
      name: 'span',
      attrs: {
        style: 'color: #000000;'
      },
      children: [{
        type: 'text',
        text: key2
      }]
    }
    nodes = nodes.concat(node1,node2)
  } else {
    const node = {
      name: 'span',
      attrs: {
        style: 'color: #000000;'
      },
      children: [{
        type: 'text',
        text: item
      }]
    }
    nodes.push(node)
  }
  return nodes
}