import data from './data.json' assert {type: 'json'}

const mainContent = document.getElementById('mainContent');


let edit = document.getElementsByClassName('editBtn');
let deleteBtn = document.getElementsByClassName('deleteBtn');
let usertext = document.getElementsByClassName('userText');
let usercomment = document.getElementsByClassName('userComment');
let modifier = document.getElementsByClassName('modifier');

let plus = document.getElementsByClassName('plus');
let moins = document.getElementsByClassName('minus');
let screen = document.getElementsByClassName('screen');
const send = document.getElementById('send');

let themeBtn = document.getElementById('theme');
let theme = document.getElementsByClassName('theme');
let astre = document.getElementById('astre');


let sendReply = document.getElementsByClassName('sendReply');
let replySection = document.getElementsByClassName('replySection');

let replyBtn = document.getElementsByClassName('replyBtn');
let replyModal = document.getElementsByClassName('replyModal');
let otherName = document.getElementsByClassName('otherName');


let numberOfUserComments = 0;

let deleteModal = document.createElement('div');
deleteModal.classList.add('modal');
deleteModal.innerHTML = `
<h1>Delete comment</h1>
<p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
<div>
 <button id="no" class="no modalBtn">NO, CANCEL</button>
 <button id="yes" class="yes modalBtn">YES, DELETE</button>
</div>
`
document.body.appendChild(deleteModal);


function replyObject(otherUser, otherImg, otherDate, otherContent, otherScore, replying) {
  return `          
  
<div class="replyObject">

  <div class="reply theme">

    <div class="screenLike theme">
      <button class="plus bgNone"><img src="./public/icon-plus.svg" alt=""></button>
      <button class="screen bgNone">${otherScore}</button>
      <button class="minus bgNone"><img src="./public/icon-minus.svg" alt=""></button>
    </div>

    <div class="header">
        <div class="profile">
          <btn class="otherProfile"><img src="${otherImg}" alt=""></btn>
          <h1 class="userName theme otherName">${otherUser}</h1>
          <b class="date theme">${otherDate}</b>
          <button class="replyBtn theme bgNone"><img src="./public/icon-reply.svg" alt="">Reply</button>
        </div>

        <p class="text theme"><span class="replying">@${replying}</span> ${otherContent}</p>
      </div>
    </div>

    <div class="replyModal theme">

      <button class="userProfile"><img src="./public/avatars/image-juliusomo.webp" alt=""></button>
      <textarea class="replyText"></textarea>
      <button class="sendReply mainBtn">Reply</button>

    </div>

  <div class="replySection replyReplySection theme"></div>

</div>
`
}

function commentObject(username, userImg, date, content, score) {
  return `
  <div class="commentObject">

        <div class="comment theme">

          <div class="screenLike theme">
            <button class="plus bgNone"><img src="./public/icon-plus.svg" alt=""></button>
            <button class="screen bgNone">${score}</button>
            <button class="minus bgNone"><img src="./public/icon-minus.svg" alt=""></button>
          </div>

          <div class="header">
            <div class="profile">
              <btn class="otherProfile mainProfile"><img src="${userImg}" alt=""></btn>
              <h1 class="userName theme otherName">${username}</h1>
              <b class="date theme">${date}</b>            
              <button class="replyBtn theme bgNone"><img src="./public/icon-reply.svg" alt="">Reply</button>
            </div>

            <p class="text theme">${content}</p>
          </div>

        </div>

        <div class="replyModal theme">

          <button class="userProfile"><img src="./public/avatars/image-juliusomo.webp" alt=""></button>
          <textarea class="replyText"></textarea>
          <button class="sendReply mainBtn">Reply</button>

        </div>

        <div class="replySection theme"></div>

        </div>

      </div>

  `
}

function initialContent() {

  for (let i = 0; i < data.comments.length; i++) {
    mainContent.innerHTML += commentObject(data.comments[i].user.username, data.comments[i].user.image.webp, data.comments[i].createdAt, data.comments[i].content, data.comments[i].score)

    for (let j = 0; j < data.comments[i].replies.length; j++) {
      let replySection = document.getElementsByClassName('replySection');
      replySection[i].innerHTML += replyObject(data.comments[i].replies[j].user.username, data.comments[i].replies[j].user.image.webp, data.comments[i].replies[j].createdAt, data.comments[i].replies[j].content, data.comments[i].replies[j].score, data.comments[i].replies[j].replyingTo)
    }

  }

  let firstUserComment = document.getElementsByClassName('replyObject')[1];

  firstUserComment.innerHTML = `<div class="commentObject">

  <div class="comment userComment theme">

    <div class="screenLike theme">
      <button class="plus bgNone"><img src="./public/icon-plus.svg" alt=""></button>
      <button class="screen bgNone">0</button>
      <button class="minus bgNone"><img src="./public/icon-minus.svg" alt=""></button>    
    </div>

    <div class="header">
    <div class="profile">
      <btn class="otherProfile"><img src="${data.currentUser.image.webp}" alt=""></btn>
      <h1 class="userName theme">${data.currentUser.username}</h1>
      <span id='you'>you</span>
      <b class="date theme">just now</b>
      <div class="modifier">
       <button class="deleteBtn theme bgNone"><img src="./public/icon-delete.svg" alt="">Delete</button>
       <button class="editBtn theme bgNone"><img src="./public/icon-edit.svg" alt="">Edit</button>
      </div>
    </div>
      

    
    <p id='userText0' class="userText text theme"><span class="replying">@${data.comments[1].replies[1].replyingTo}</span> I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.</p>

    </div>
  </div>

</div>`

}

function userCommentObject(content) {
  numberOfUserComments++;
  return `
  <div class="commentObject">

    <div class="comment userComment theme">

      <div class="screenLike theme">
        <button class="plus bgNone"><img src="./public/icon-plus.svg" alt=""></button>
        <button class="screen bgNone">0</button>
        <button class="minus bgNone"><img src="./public/icon-minus.svg" alt=""></button>    
      </div>

      <div class="header">
      <div class="profile">
        <btn class="otherProfile"><img src="${data.currentUser.image.webp}" alt=""></btn>
        <h1 class="userName theme">${data.currentUser.username}</h1>
        <span id='you'>you</span>
        <b class="date theme">just now</b>
        <div class="modifier">
         <button class="deleteBtn theme bgNone"><img src="./public/icon-delete.svg" alt="">Delete</button>
         <button class="editBtn theme bgNone"><img src="./public/icon-edit.svg" alt="">Edit</button>
        </div>
      </div>
        

      
      <p id='userText${numberOfUserComments}' class="userText text theme">${content}</p>
      </div>
    </div>

  </div>

  `
}
function userReplyObject(content, replying) {
  numberOfUserComments++;
  return `
  <div class="commentObject">

    <div class="comment userComment userReply theme">

      <div class="screenLike theme">
        <button class="plus bgNone"><img src="./public/icon-plus.svg" alt=""></button>
        <button class="screen bgNone">0</button>
        <button class="minus bgNone"><img src="./public/icon-minus.svg" alt=""></button>    
      </div>

      <div class="header">
      <div class="profile">
        <btn class="otherProfile"><img src="${data.currentUser.image.webp}" alt=""></btn>
        <h1 class="userName theme">${data.currentUser.username}</h1>
        <span id='you'>you</span>
        <b class="date theme">just now</b>
        <div class="modifier">
         <button class="deleteBtn theme bgNone"><img src="./public/icon-delete.svg" alt="">Delete</button>
         <button class="editBtn theme bgNone"><img src="./public/icon-edit.svg" alt="">Edit</button>
        </div>
      </div>
        

      
      <p id='userText${numberOfUserComments}' class="userText text theme">${replying} ${content}</p>
     </div>
    </div>

  </div>

  `
}
function sendComment() {

  const userText = document.getElementById('userText')

  let state = false;

  if (userText.value.length > 0) {
    let sample = userText.value.replace(/\s/g, '')
    if (sample.length > 0) {
      state = true;
    }
  }

  if (state) {
    mainContent.innerHTML += userCommentObject('null');
    document.getElementsByTagName('header')[0].scrollTo(0, document.getElementsByTagName('header')[0].scrollHeight)
    let text = document.getElementById(`userText${numberOfUserComments}`);
    text.innerText = userText.value.toString();
    plus = document.getElementsByClassName('plus');
    moins = document.getElementsByClassName('minus');
    screen = document.getElementsByClassName('screen');
  }

  userText.value = '';
  userText.blur()


  let edit = document.getElementsByClassName('editBtn');
  let deleteBtn = document.getElementsByClassName('deleteBtn');
  let usertext = document.getElementsByClassName('userText');
  let modifier = document.getElementsByClassName('modifier');

  for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener('click', () => {
      deleteBtn[i].style.display = 'none';
      edit[i].style.display = 'none';
      usertext[i].contentEditable = true;
      usertext[i].style.outline = 'var(--contenteditable)';
      usertext[i].classList.add('contenteditable');

      let update = document.createElement('button')
      update.id = 'updateBtn';
      update.classList.add('mainBtn');
      update.innerText = 'Update';
      modifier[i].appendChild(update);

      update.addEventListener('click', () => {
        usertext[i].contentEditable = false;
        usertext[i].style.outline = 'none';
        usertext[i].classList.remove('contenteditable');
        update.remove();
        deleteBtn[i].style.display = 'flex';
        edit[i].style.display = 'flex';
      })

    })
  }

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', () => {

      deleteModal.classList.add('deleteModal');
      document.body.classList.add('deleteModal');

      let no = document.getElementById('no');
      let yes = document.getElementById('yes');

      no.addEventListener('click', () => {
        deleteModal.classList.remove('deleteModal');
        document.body.classList.remove('deleteModal');
      })

      yes.addEventListener('click', () => {
        deleteModal.classList.remove('deleteModal');
        document.body.classList.remove('deleteModal');

        usercomment[i].classList.add('display');
      })
    })
  }



  toLike()

  let sendReply = document.getElementsByClassName('sendReply');
  let replySection = document.getElementsByClassName('replySection');

  let replyBtn = document.getElementsByClassName('replyBtn');
  let replyModal = document.getElementsByClassName('replyModal');
  let otherName = document.getElementsByClassName('otherName');

  for (let i = 0; i < replyBtn.length; i++) {
    replyBtn[i].addEventListener('click', () => {


      replyModal[i].getElementsByClassName('replyText')[0].value = '';
      replyModal[i].getElementsByClassName('replyText')[0].focus();
      replyModal[i].classList.toggle('show');

      for (let j = 0; j < replyModal.length; j++) {
        if (j != i) {
          replyModal[j].classList.remove('show');
        }
      }

    })
  }
  for (let i = 0; i < sendReply.length; i++) {
    sendReply[i].addEventListener('click', () => {

      let replying = otherName[i].innerHTML;

      for (let j = 0; j < replyModal.length; j++) {
        replyModal[j].classList.remove('show');
      }

      replySection[i].innerHTML += userReplyObject(replyModal[i].getElementsByClassName('replyText')[0].value, `<span class="replying">@${replying}</span>`);

      toLike()

      theme = document.getElementsByClassName('theme')
      if (document.body.classList.contains('dark')) {
        for (let i = 0; i < theme.length; i++) {
          if (astre.classList.contains('moon')) {
            theme[i].classList.add('dark');
          }
        }
      }

      let edit = document.getElementsByClassName('editBtn');
      let deleteBtn = document.getElementsByClassName('deleteBtn');
      let usertext = document.getElementsByClassName('userText');
      let usercomment = document.getElementsByClassName('userComment')

      for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener('click', () => {
          usertext[i].contentEditable = true;
          usertext[i].style.outline = 'var(--contenteditable)';
          usertext[i].classList.add('contenteditable');

          let update = document.createElement('button')
          update.id = 'updateBtn';
          update.classList.add('mainBtn');
          update.innerText = 'Update';
          usercomment[i].appendChild(update)

          update.addEventListener('click', () => {
            usertext[i].contentEditable = false;
            usertext[i].style.outline = 'none';
            usertext[i].classList.remove('contenteditable');
            update.remove();
          })

        })
      }

      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {

          deleteModal.classList.add('deleteModal');
          document.body.classList.add('deleteModal');

          let no = document.getElementById('no');
          let yes = document.getElementById('yes');

          no.addEventListener('click', () => {
            deleteModal.classList.remove('deleteModal');
            document.body.classList.remove('deleteModal');
          })

          yes.addEventListener('click', () => {
            deleteModal.classList.remove('deleteModal');
            document.body.classList.remove('deleteModal');

            usercomment[i].classList.add('display');
          })
        })
      }

    })
  }

  theme = document.getElementsByClassName('theme')
  if (document.body.classList.contains('dark')) {
    for (let i = 0; i < theme.length; i++) {
      if (!theme[i].classList.contains('dark')) {
        theme[i].classList.toggle('dark');
      }
    }
  }
}

function toLike() {


  let plus = document.getElementsByClassName('plus');
  let moins = document.getElementsByClassName('minus');
  let screen = document.getElementsByClassName('screen');

  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener('click', () => {
      screen[i].innerHTML = parseInt(screen[i].innerHTML) + 1;
      moins[i].disabled = false;
      plus[i].disabled = true;
    })
  }

  for (let i = 0; i < moins.length; i++) {
    moins[i].addEventListener('click', () => {
      if (plus[i].disabled != false) {
        screen[i].innerHTML = parseInt(screen[i].innerHTML) - 1;
        moins[i].disabled = true;
        plus[i].disabled = false;
      }
    })
  }
}

initialContent()

toLike()

for (let i = 0; i < edit.length; i++) {
  edit[i].addEventListener('click', () => {
    deleteBtn[i].style.display = 'none';
    edit[i].style.display = 'none';
    usertext[i].contentEditable = true;
    usertext[i].style.outline = 'var(--contenteditable)';
    usertext[i].classList.add('contenteditable');

    let update = document.createElement('button')
    update.id = 'updateBtn';
    update.classList.add('mainBtn');
    update.innerText = 'Update';
    modifier[i].appendChild(update);

    update.addEventListener('click', () => {
      usertext[i].contentEditable = false;
      usertext[i].style.outline = 'none';
      usertext[i].classList.remove('contenteditable');
      update.remove();
      deleteBtn[i].style.display = 'flex';
      edit[i].style.display = 'flex';
    })

  })
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', () => {

    deleteModal.classList.add('deleteModal');
    document.body.classList.add('deleteModal');

    let no = document.getElementById('no');
    let yes = document.getElementById('yes');

    no.addEventListener('click', () => {
      deleteModal.classList.remove('deleteModal');
      document.body.classList.remove('deleteModal');
    })

    yes.addEventListener('click', () => {
      deleteModal.classList.remove('deleteModal');
      document.body.classList.remove('deleteModal');

      usercomment[i].classList.add('display');
    })
  })
}

for (let i = 0; i < replyBtn.length; i++) {
  replyBtn[i].addEventListener('click', () => {


    replyModal[i].getElementsByClassName('replyText')[0].value = '';
    replyModal[i].getElementsByClassName('replyText')[0].focus();
    replyModal[i].classList.toggle('show');

    for (let j = 0; j < replyModal.length; j++) {
      if (j != i) {
        replyModal[j].classList.remove('show');
      }
    }

  })
}

for (let i = 0; i < sendReply.length; i++) {
  sendReply[i].addEventListener('click', () => {

    let replying = otherName[i].innerHTML;

    for (let j = 0; j < replyModal.length; j++) {
      replyModal[j].classList.remove('show');
    }

    replySection[i].innerHTML += userReplyObject(replyModal[i].getElementsByClassName('replyText')[0].value, `<span class="replying">@${replying}</span>`);

    toLike()

    theme = document.getElementsByClassName('theme')
    if (document.body.classList.contains('dark')) {
      for (let i = 0; i < theme.length; i++) {
        if (astre.classList.contains('moon')) {
          theme[i].classList.add('dark');
        }
      }
    }

    let edit = document.getElementsByClassName('editBtn');
    let deleteBtn = document.getElementsByClassName('deleteBtn');
    let usertext = document.getElementsByClassName('userText');
    let usercomment = document.getElementsByClassName('userComment')

    for (let i = 0; i < edit.length; i++) {
      edit[i].addEventListener('click', () => {
        usertext[i].contentEditable = true;
        usertext[i].style.outline = 'var(--contenteditable)';
        usertext[i].classList.add('contenteditable');

        let update = document.createElement('button')
        update.id = 'updateBtn';
        update.classList.add('mainBtn');
        update.innerText = 'Update';
        usercomment[i].appendChild(update)

        update.addEventListener('click', () => {
          usertext[i].contentEditable = false;
          usertext[i].style.outline = 'none';
          usertext[i].classList.remove('contenteditable');
          update.remove();

          edit = document.getElementsByClassName('editBtn');
          deleteBtn = document.getElementsByClassName('deleteBtn');
        })

      })
    }

    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener('click', () => {

        deleteModal.classList.add('deleteModal');
        document.body.classList.add('deleteModal');

        let no = document.getElementById('no');
        let yes = document.getElementById('yes');

        no.addEventListener('click', () => {
          deleteModal.classList.remove('deleteModal');
          document.body.classList.remove('deleteModal');
        })

        yes.addEventListener('click', () => {
          deleteModal.classList.remove('deleteModal');
          document.body.classList.remove('deleteModal');

          usercomment[i].classList.add('display');
        })
      })
    }

  })
}


send.addEventListener('click', sendComment)
document.body.addEventListener('keydown', (e) => { if (e.key === 'Enter') { sendComment() } })

themeBtn.addEventListener('click', () => {
  astre.classList.toggle('moon');
  for (let i = 0; i < theme.length; i++) {
    theme[i].classList.toggle('dark');
  }
})

