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

function loadPosts(){
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('linkDePostagens');

        data.forEach(post => {
          const div = document.createElement('div');
          div.className = 'post';
          div.innerHTML = `
           <strong>Imagem</strong> <span id="image-${post.id}"></span><br>
            <strong>Id:</strong> ${post.id}<br>
            <strong>Titulo:</strong> ${post.Titulo}<br>
            <strong>conteúdo:</strong> ${post.conteúdo}<br>
            <strong>Date:</strong> ${post.date}<br>
           
            

          `;
          container.appendChild(div);
          loadImages(post.id, 0).then(link => {
            const imageSpan = document.getElementById(`image-${post.id}`);
            if (imageSpan) {
                imageSpan.innerHTML = `<img src="${link}" alt="Post Image" />`;
            }
        });
        });
      })
      .catch(err => console.error('Error:', err));
}

function loadTags(){
    fetch('http://localhost:3000/tags')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('filtro');

        data.forEach(tag => {
          const div = document.createElement('div');
          div.className = 'tagselector';
          div.innerHTML = `
            <strong>Tag:</strong> ${tag.tag_id}<br>
            <strong>Titulo:</strong> ${tag.tag_name}<br>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => console.error('Error:', err));
}


loadPosts();
loadTags();