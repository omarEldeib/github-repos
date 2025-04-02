let getBtn = document.querySelector('.get-button');
let input = document.querySelector('input');
let resContainer = document.querySelector('.repos-container');

getBtn.addEventListener('click', function(){
    resContainer.innerHTML = '';
    getData()
})

function getData(){
    if(input.value === ""){
        resContainer.innerHTML = `<span>Please add your github username</span>`
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(repo => {
                let mainDiv = document.createElement('div');
                mainDiv.className = 'repo';
                let repoName = document.createElement('p');
                repoName.className = "repo_name";
                repoName.textContent = repo.name;
                mainDiv.appendChild(repoName);
                resContainer.appendChild(mainDiv);
                let stars = document.createElement('span');
                stars.className = 'stars';
                stars.textContent = `Stars: ${repo.stargazers_count}`;
                mainDiv.appendChild(stars);
                let visit = document.createElement('a');
                visit.className = "visit";
                visit.href = repo.html_url;
                visit.target = '_blank';
                visit.textContent = 'Visit';
                mainDiv.appendChild(visit);
            })
        }).catch(error => {
            resContainer.innerHTML = `<span>User not found</span>`
        })
    }
}    
