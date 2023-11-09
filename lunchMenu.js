let mList, i, li, delBtn, existingMenu, toList, toDoList;
let storageMenu, menuArr, menu, newMenu, todayArray, todayMenu, menuList;
let yesterday = '';

function pressKey(event) {
    if(event.keyCode == 13) {
        addMenu();
    }
}

if(localStorage.getItem("counter") == null) {
    localStorage.setItem("counter", '0');
    localStorage.setItem("restCounter", '0');
}

if(localStorage.getItem("mList") == null || localStorage.getItem("mList") == '') {
    mList = []
    localStorage.setItem("mList", mList)
} else {
    mList = localStorage.getItem("mList");
    mList = mList.split(',')
    for(i = 0; i < mList.length; i++) {
        storageMenu = localStorage.getItem(mList[i]);
    
        li = document.createElement('li');
        li.innerHTML = storageMenu;
        li.className = mList[i]
    
        delBtn = document.createElement('button');
        delBtn.innerHTML = 'x';
        delBtn.setAttribute("onclick","delToDo(this);")
        delBtn.className = "del_menu"
    
        existingMenu = document.querySelector('.menu_list');
        existingMenu.appendChild(li);
    }
}

if(localStorage.getItem("toList") == null || localStorage.getItem("toList") == '') {
    toList = []
    localStorage.setItem("toList",toList)
} else {
    toList = localStorage.getItem("toList");
    toList = toList.split(',')
    for(i = 0; i < toList.length; i++) {
        storageMenu = localStorage.getItem(toList[i]);
        li = document.createElement('li');
        li.innerHTML = storageMenu;
    
        toDoList = document.querySelector('.todo_list');
        toDoList.appendChild(li);
    
        li.className = toList[i];
    }
}

let n = parseInt(localStorage.getItem("counter"));
let n2 = parseInt(localStorage.getItem("restCounter"));

function sortMenu() {
    menuArr = document.querySelectorAll(".menu_list li");
    menu = [];
    if(menuArr.length >= 2) {
        for(i = 0; i < menuArr.length; i++) {
            menu.push(menuArr[i].innerHTML);
        }

        if(menu.includes(yesterday)) {
            todayArray = notYesterday(menu);
        } else {
            todayArray = menu;
        }
        
        todayMenu = randomForMenu(todayArray);

        let today = new Date();
        let month = today.getMonth()+1;
        let day = today.getDate();
    
        n++;
        li = document.createElement('li');
        li.innerHTML = month + "/" + day + "&nbsp&nbsp" + todayMenu;
        li.className = "menuList" + n;
        toList.push(li.className)
        localStorage.setItem("toList", toList);
       
        menuList = li.innerHTML;
        
        localStorage.setItem("menuList" + n, menuList);
        localStorage.removeItem('counter');
        localStorage.setItem("counter", n);

        yesterday = todayMenu;

        toDoList = document.querySelector('.todo_list');
        toDoList.appendChild(li);
    } else {
        alert('식당은 두 곳 이상 입력해주세요')
    }
}

function randomForMenu(todayArray) {
    // 오늘의 메뉴 리턴
    let rand = Math.random();
    let randint = Math.floor(rand * (todayArray.length));

    return todayArray[randint]
}

function notYesterday(menu) {
    let idx = menu.indexOf(yesterday);
    menu.splice(idx, 1);

    return menu;
}

function delToDo(delBtn) {
    if(confirm("정말 삭제할까요?")) {
        localStorage.removeItem(delBtn.parentNode.className);
        delBtn.parentNode.parentNode.removeChild(delBtn.parentNode);
        
        if(delBtn.parentNode.className.slice(0, 8) == 'menuList') {
            localStorage.removeItem(delBtn.parentNode.className);
            idx = toList.indexOf(delBtn.parentNode.className);
 
            toList.splice(idx, 1);
          
            localStorage.removeItem("toList");
            localStorage.setItem("toList", toList);
        } else {
            localStorage.removeItem(delBtn.parentNode.className);
            idx = mList.indexOf(delBtn.parentNode.className);
           
            mList.splice(idx, 1);
            localStorage.removeItem("mList");
            localStorage.setItem("mList", mList);
        }
    }
}

function addMenu() {
    menuArr = document.querySelectorAll(".menu_list li");  
    menu = [];

    for(i = 0; i < menuArr.length; i++) {
        console.log('여기여기1 :', menuArr);
        console.log('여기여기2 :', menuArr[i].innerHTML);
        console.log('여기여기3 :', menuArr[i].innerHTML.split('<')[0]);
        menu.push(menuArr[i].innerHTML.split('<')[0]);
        console.log('여기여기4 menu :', menu);
    }

    newMenu = document.querySelector('.input_menu').value;

    if( !menu.includes(newMenu) && newMenu != '' ) {
        li = document.createElement('li');
      
        if(localStorage.getItem("restCounter") == null) {
            localStorage.setItem("restCounter",0)
        }

        li.className = "rest" + n2;
        mList.push(li.className)
        localStorage.setItem("mList" ,mList);
 
        li.innerHTML = newMenu;
       
        delBtn = document.createElement('button');
        delBtn.innerHTML = 'x';
        delBtn.setAttribute("onclick","delToDo(this);")
        delBtn.className = "del_menu"
        li.appendChild(delBtn);

        existingMenu = document.querySelector('.menu_list');
        existingMenu.appendChild(li);
        document.querySelector('.input_menu').value = '';

        localStorage.setItem("rest" + n2, li.innerHTML);
        n2++;
        localStorage.setItem("restCounter", n2)

    } else if(menu.includes(newMenu)) {
        alert('이미 존재하는 식당이에요')
    }

}

function allClear() {
    if(confirm('모든 기록을 삭제할까요?')) {
        if(localStorage.getItem("counter") != 0) {
            localStorage.clear();
            window.location.reload();
        }
    }
}

function allRecordDel() {
     menuList = document.querySelector(".todo_list"); 

     if(confirm('기록된 메뉴를 모두 삭제할까요?')) {
        if(localStorage.getItem("toList") != null) {
            while( menuList.hasChildNodes() ) {
                localStorage.removeItem("toList");
                menuList.removeChild(menuList.firstChild); 
            }
        }
    }
}