function User(name, password, rol){
    this.name = name;
    this.password = password;
    this.rol = rol;
    this.equals = function(user){
        return this.name == user.name && this.password == user.password
    }
}

function Person(name, birth, death, image, wiki, videos){
    this.name = name;
    this.birth = birth;
    this.death = death;
    this.image = image;
    this.wiki = wiki;
    this.videos = videos;
}

function Entity(name, birth, death, wiki, videos){
    this.name = name;
    this.birth = birth;
    this.death = death;
    this.wiki = wiki;
    this.videos = videos;
}

function Product(name, birth, death, wiki, videos){
    this.name = name;
    this.birth = birth;
    this.death = death;
    this.wiki = wiki;
    this.videos = videos;
}

function Mediateca() {

    this.reset = function(){
        this.users = [];
        this.persons = [];
        this.entities = [];
        this.products = [];
    };

    this.readFromLocalStorage = function(object){
        let json = window.localStorage.getItem("mediateca");
        if (typeof json === "object"){
            let object = JSON.parse(json);
            this.users = object.users;
            this.persons = object.persons;
            this.entities = object.entities;
            this.products = object.products;
        }
    };

    this.reset();
    this.readFromLocalStorage();
    
    this.getLoggedUsers = function (){
        let users = [];
        for(user of mediateca.users){
            users.push(new User(user.name, user.password, user.rol));
        }
        return users;
    };

    this.getLoggedUser = function(user){
        for(let loggedUser of this.getLoggedUsers()){
            if (loggedUser.equals(user)){
                return loggedUser;
            }
        }
        return null;
    };

    this.getNamePersons = function (){
        return mediateca.persons.map(person => person.name);
    };

    this.getPerson = function(name){
        return mediateca.persons.find(person => person.name == name);
    }

    this.getNameEntities = function(){
        return mediateca.entities.map(entity => entity.name);
    }

    this.getNameProducts = function(){
        return mediateca.products.map(product => product.name);
    }

    this.writeToLocalStorage = function(){
        window.localStorage.setItem("mediateca", this);
    };

    this.setEmpty = function() {
        this.reset();
        this.writeToLocalStorage();
    };

    this.setExample = function() {
        this.users = [
            new User("m", "m", "writer"),
            new User("a", "a", "reader"),
            new User("b", "b", "reader"),
            new User("c", "c", "reader"),
        ],
        this.persons = [
            new Person("Alguien1", "11/11/1111", "12/12/1222", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/479px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
                "https://www.upm.es", [
                "linkvideo11",
                "linkvideo12",                    
            ]),
            new Person("Alguien2", "21/21/2111", "22/22/2222", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/479px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
                "https://www.upm.es", [
                "linkvideo21",
                "linkvideo22",
            ]),
            new Person("Alguien3", "31/31/3111", "32/32/3222", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/479px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
                "https://www.upm.es", [
                "linkvideo31",
                "linkvideo32",
            ])
        ],
        this.entities = [
            new Entity("Entidad1", "11/11/1111", "12/12/1222", "linkwiki1", [
                "linkvideo11",
                "linkvideo12",                    
            ]),
            new Entity("Entidad2", "21/21/2111", "22/22/2222", "linkwiki2", [
                "linkvideo21",
                "linkvideo22",
            ]),
        ],
        this.products = [
            new Entity("Producto1", "11/11/1111", "12/12/1222", "linkwiki1", [
                "linkvideo11",
                "linkvideo12",                    
            ]),
        ],
        this.writeToLocalStorage();
    };
}

let mediateca = new Mediateca();

function load(){
    let main = document.getElementById("main");
    main.innerHTML = '';
    loadPersons(main);
    loadEntities(main);
    loadProducts(main);
}

function loadPersons(main){
    let section = '<section class="persons">';
    section += '<h1>Personas</h1>';
    section += '<form>';
    section += '<ul id="persons">';
    for(name of mediateca.getNamePersons()){
        let li = '<li>';
        li += '<button type="button" onclick="loadPerson(main, ' + "'" + name + "'" + ');">'
             + name + '</button>';
        li += '</li>';
        section += li;
    }
    section += '</ul>';
    section += '</form>';
    section += '</section>';
    main.innerHTML += section;
}

function loadPerson(main, person){
    var person = mediateca.getPerson(person);
    let divPerson = '';
    divPerson += '<div class="person">';
    divPerson += '<div class="data">';
    divPerson += '<ul>';
    divPerson += '<li>Nombre: ' + person.name + '</li>';
    divPerson += '<li>Nacimiento: ' + person.birth + '</li>';
    divPerson += '<li>Defunción: ' + person.death + '</li>';
    divPerson += '</ul></div>';
    divPerson += '<div class="image">';
    divPerson += '<image width="30%" src="' + person.image + '"/>';
    divPerson += '</div>';
    divPerson += '<div class="wiki">';
    divPerson += '<iframe width="100%" height="300px" src="' + person.wiki +'">';
    divPerson += '</iframe>';
    divPerson += '</div>';
    divPerson += '<div class="videos">';
    divPerson += '<ul>';
    for(video of person.videos){
        divPerson += '<li>Video: ' + video + '</li>'; 
    }
    divPerson += '</ul>';
    divPerson += '</div>';
    divPerson += '<div class="exit">';
    divPerson += '<form>';
    divPerson += '<button onclick="load();">Índice</button>';
    divPerson += '</form>';
    divPerson += '</div>';
    divPerson += '</div>'
    main.innerHTML = divPerson;
}

function loadEntities(main){
    let section = '<section class="entities">';
    section += '<h1>Entidades</h1>';
    section += '<form>';
    section += '<ul id="entities">';
    for(name of mediateca.getNameEntities()){
        let li = '<li>';
        li += '<button type="button" onclick="loadEntity(' + "'" + name + "'" + ');">'
             + name + '</button>';
        li += '</li>';
        section += li;
    }
    section += '</ul>';
    section += '</form>';
    section += '</section>';
    main.innerHTML += section;
}

function loadEntity(entity){
    alert("Entity: " + entity);
}

function loadProducts(main){
    let section = '<section class="products">';
    section += '<h1>Productos</h1>';
    section += '<form>';
    section += '<ul id="products">';
    for(name of mediateca.getNameProducts()){
        let li = '<li>';
        li += '<button type="button" onclick="loadProduct(' + "'" + name + "'" + ');">'
             + name + '</button>';
        li += '</li>';
        section += li;
    }
    section += '</ul>';
    section += '</form>';
    section += '</section>';
    main.innerHTML += section;
}

function loadProduct(product){
    alert("Product: " + product);
}

function unloadExample(){
    mediateca.setEmpty();
    load();
}

function loadExample() {
    mediateca.setExample();
    load();
}

function isLoggedUser(){
    let user = new User(document.getElementById("user").value,
        document.getElementById("password").value);
    let loggedUser = mediateca.getLoggedUser(user);
    if (loggedUser == null){
        login.action = "./login.html";
    } else {
        let login = document.getElementById("login");
        if (loggedUser.rol == "writer"){
            login.action = "./html/writerIndex.html";
        } else {
            login.action = "./html/readerIndex.html";
        }
    }
    return loggedUser != null;
}





