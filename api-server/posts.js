const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1507907473,
    title: 'Laravel, the great!',
    body: 'Laravel is a free, open-source PHP web framework.',
    author: 'thingtwo',
    category: 'laravel',
    voteScore: 3,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1507911073,
    title: 'Learn Ember in 10 minutes!',
    body: 'It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'ember',
    voteScore: -1,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnea": {
    id: '6ni6ok3ym7mf1p33lnea',
    timestamp: 1507993873,
    title: 'Great thing!',
    body: 'Another comment',
    author: 'thingone',
    category: 'laravel',
    voteScore: 2,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lneb": {
    id: '6ni6ok3ym7mf1p33lneb',
    timestamp: 1508512273,
    title: 'Learn React in 10 minutes!',
    body: 'It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'react',
    voteScore: 10,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnec": {
    id: '6ni6ok3ym7mf1p33lnec',
    timestamp: 1510585873,
    title: 'Angular my favorite!',
    body: 'Angular rocks!.',
    author: 'thingone',
    category: 'angular',
    voteScore: -5,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lned": {
    id: '6ni6ok3ym7mf1p33lned',
    timestamp: 1539529873,
    title: 'YAY I am learning angular!',
    body: 'Any tips?',
    author: 'thingone',
    category: 'angular',
    voteScore: 2,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnef": {
    id: '6ni6ok3ym7mf1p33lnef',
    timestamp: 1542121873,
    title: 'Ember sucks!',
    body: 'What else can I say?',
    author: 'thingone',
    category: 'ember',
    voteScore: 15,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnee": {
    id: '6ni6ok3ym7mf1p33lnee',
    timestamp: 1476375073,
    title: 'Good Bye Ember',
    body: 'Just kidding. It already gone.',
    author: 'thingone',
    category: 'ember',
    voteScore: -10,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
