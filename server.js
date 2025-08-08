const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments');

async function loadComments() {
  const res = await fetch('http://localhost:3000/comments');
  const comments = await res.json();
  commentsList.innerHTML = '';
  comments.forEach(({ username, comment }) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = username;
    li.appendChild(strong);

    const p = document.createElement('p');
    p.textContent = comment;
    li.appendChild(p);

    commentsList.appendChild(li);
  });
}

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = commentForm.username.value.trim();
  const commentText = commentForm.comment.value.trim();

  if (!username || !commentText) {
    alert('Please fill in both name and comment.');
    return;
  }

  // Send comment to backend
  const res = await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, comment: commentText }),
  });

  const data = await res.json();
  if (data.success) {
    commentForm.reset();
    loadComments(); // refresh comments list
  } else {
    alert('Failed to save comment');
  }
});

// Load comments on page load
loadComments();
