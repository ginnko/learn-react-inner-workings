// Transformation
// 一个纯函数

function NameBox(name) {
  return {
    fontWeight: 'bold',
    labelContent: name
  };
}

// console.log(NameBox('Yang ginnko'));



// Abstraction

function FancyUserBox(user) {
  return {
    boderStyle: '1px solid blue',
    childContent: [
      'Name: ',
      NameBox(user.firstName + ' ' + user.lastName)
    ]
  }
}

const user = {
  firstName: 'ginnko',
  lastName: 'Yang'
};

// console.log(FancyUserBox(user));

// Composition
// 下面这个UserBox就是一个抽象容器
// 将FancyBox和NameBox组合在一起

function FancyBox(children) {
  return {
    borderStyle: '1px solid blue',
    children: children
  }
}

function UserBox(user) {
  return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
  ]);
}

// console.log(UserBox(user));

// State
// LikeBox, NameBox, LikeButton都是承担不同具体功能的抽象
// FancyBox是组合这些抽象的容器
// FancyNameBox是组合容器的抽象
// likes是这个UI的state

function FancyNameBox(user, likes, onClick) {
  return FancyBox([
    'Name: ', NameBox(user.firstName + ' ' + user.lastName),
    'Likes: ', LikeBox(likes),
    LikeButton(onClick)
  ]);
}

var likes = 0;
function addOneMoreLike() {
  likes++;
  rerender();
}

FancyNameBox(
  user,
  likes,
  addOneMoreLike
);

// Memoization

function memoize(fn) {
  var cachedArg;
  var cachedResult;
  return function(arg) {
    if (cachedArg === arg) {
      return cachedResult;
    }

    cachedArg = arg;
    cachedResult = fn(arg);
    return cachedResult;
  };
}

var MemoizedNameBox = memoize(NameBox);

function NameAndAgeBox(user, currentTime) {
  return FancyBox([
    'Name: ',
    MemoizedNameBox(user.firstName + ' ' + user.lastName),
    'Age in milliseconds: ',
    currentTime - user.dateOfBirth
  ]);
}

// Lists

function UserList(users, likesPerUser, updateUserLikes) {
  return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)
  ));
}

var likesPerUser = new Map();

function updateUserLikes(id, likeCount) {
  likesPerUser.set(id, likeCount);
  rerender();
}

UserList(data.users, likesPerUser, updateUserLikes);

// Continuations

function FancyUserList(users) {
  return FancyBox(
    UserList.bind(null, users)//....................还能这样用？
  );
}

const box = FancyUserList(data.users);
const resolvedChildren = box.children(likesPerUser, updateUserLikes);//...................还能这样用？
const resolvedBox = {
  ...box,
  children: resolvedChildren
};


