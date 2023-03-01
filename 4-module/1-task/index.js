function makeFriendsList(friends) {
  const ul = document.createElement('ul');
    
    for (let prop in friends) {
      let li = document.createElement('li');
      li.innerHTML = `${friends[prop].firstName} ${friends[prop].lastName}`;
      ul.append(li);
    } 
    return ul;
}