
var postList = loadPosts();
function loadImages(post_id, img_pos){
  return fetch(`http://localhost:3000/linkimg/${post_id}/${img_pos}`)
  .then(response => response.json())
  .then(data => {
      if (data.length > 0) {
          return data[0].img_link; // Return the first image link
      } else {
          return 'Imagem indisponivel';
      }
  })
  .catch(err => {
      console.error('Error:', err);
      return 'Erro de carregamento de imagem.';
  });
  }
  function loadTagsPerPostId(poste_id){
    return fetch('http://localhost:3000/posts/'+poste_id+'/tags')
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            return data; // Return the first image link
        } else {
            return [];
        }
        })
        .catch(err => {console.error('Error:', err); return [];});
  }

function buildPosts(data){
  data.reverse();
  const container = document.getElementById('linkDePostagens');
  console.log(data)
  data.forEach(post => {
    console.log(post);
    const dateOnly = new Date(post.date).toISOString().slice(0, 10);
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <div id="image-${post.id}"></div><br>
      <div>
      
      <span class="postTitle"> ${post.Titulo}</span><br>
      <span class="tagChatinha" id="tag-${post.id}"></span><br>
      <span class="dataConteudo"> ${dateOnly}</span><br>
      <div class="conteudoPost">${post.conteúdo}</div><br>
      </div>
    `;
    container.appendChild(div);
    loadImages(post.id, 0).then(link => {
      // trocar por uma getElementByClass com a busca envolvendo a posição da imagem no id quando adicionar múltiplas imagens por post.
      const imageSpan = document.getElementById(`image-${post.id}`);
      if (imageSpan) {
          imageSpan.innerHTML = `<img src="${link}" alt="Post Image" />`;
      }
  });
    loadTagsPerPostId(post.id).then(tagArray => {
      const tagSpan = document.getElementById(`tag-${post.id}`);
      console.log("iniciando carregamento de tags por id do poste... ");
      if(tagSpan){
        tagArray.forEach(individualTags => {
          const littleTag = document.createElement('tag');
          console.log(individualTags);
          littleTag.className = 'individualTag';
          loadTagNameByTagId(individualTags.tag_id).then(nameOfTheTag => { 
            console.log(nameOfTheTag);
            littleTag.innerHTML = nameOfTheTag;
            tagSpan.appendChild(littleTag);
          }
        );
        } );
      }
    });
  });
}

function loadPosts(post_id){
    return fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => console.error('Error:', err));
}

function loadTags(){
    return fetch('http://localhost:3000/tags')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => console.error('Error:', err));
}

function loadPostsIdsByTag(tag_id){
  return fetch('http://localhost:3000/tags/'+tag_id+'/posts')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => console.error('Error:', err));
}
function clearPostsInLinkDePostagens(){
  const container = document.getElementById('linkDePostagens');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
function filterPostsByTag(tag_id){
  clearPostsInLinkDePostagens()
  console.log(tag_id);
  loadPostsIdsByTag(tag_id).then(post_ids => {
    console.log(post_ids);
    Promise.all(
      post_ids.map(post_id => {
        console.log(post_id);
        return fetch(`http://localhost:3000/posts/${post_id.post_id}`)
          .then(response => response.json())
          .catch(err => {
            console.error(`Erro chamando post de id ${post_id}:`, err);
            return null; 
          });
      })
    ).then(posts => {
      const validPosts = posts.flat().filter(post => post !== null); // Flatten the array and filter out null values
      console.log('then build', validPosts);
      buildPosts(validPosts);
    }).catch(err => console.error('Error fetching posts:', err));
  });
}

function buildTags(){
  loadTags().then(data => {
  const container = document.getElementById('filtro');
  data.forEach(tag => {
    const div = document.createElement('div');
    div.className = 'tagselector';
    div.innerHTML = 
      `<span class="individualTag" onclick="filterPostsByTag(${tag.tag_id})">${tag.tag_name}</span>
    `;
    container.appendChild(div);
  });});
}

function loadTagNameByTagId(tag_id){
  return loadTags().then(tags => {
  for (const element of tags) { // Iterate through the tags
    if (element.tag_id === tag_id) { // Check if tag_id matches
        console.log(element.tag_name);
        return element.tag_name; // Return the corresponding tag_name
    }
}});
}

function setNoticiaImportante(post_id){
  const noticiaImportanteContainer = document.getElementsByClassName("noticiasRelevantes");
  loadImages(post_id, 0).then(firstImage => {
    if (noticiaImportanteContainer.length > 0) {
      noticiaImportanteContainer[0].style.backgroundImage = `url(${firstImage})`;
      noticiaImportanteContainer[0].style.backgroundSize = 'cover';
      noticiaImportanteContainer[0].style.backgroundPosition = 'center';
    }
  });
  loadPosts().then(posts => {
    const lastPost = posts[post_id - 1];
    const title = document.createElement('span');
    title.className = 'importantPostTitle';
    title.innerText = lastPost.Titulo;
    noticiaImportanteContainer[0].appendChild(title);
  });
}
setNoticiaImportante(1,0);
let data = loadPosts();
loadPosts().then(data => {
  buildPosts(data);
}).catch(err => console.error('Error:', err));
buildTags();