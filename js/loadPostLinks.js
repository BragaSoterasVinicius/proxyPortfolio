
function loadPosts(){
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('linkDePostagens');

        data.forEach(post => {
          const div = document.createElement('div');
          div.className = 'post';
          div.innerHTML = `
            <strong>Id:</strong> ${post.id}<br>
            <strong>Titulo:</strong> ${post.Titulo}<br>
            <strong>Date:</strong> ${post.date}<br>
          `;
          container.appendChild(div);
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
            <strong>Titulo:</strong> ${tag.tag_id}<br>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => console.error('Error:', err));
}