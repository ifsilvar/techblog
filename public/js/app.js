// const title = document.querySelector(".title");
// const textArea = document.querySelector(".textArea");
// const submit = document.querySelector(".submitButton");

// submit.addEventListener("click", function() {
//     $.ajax({
//         url: "/api/blogs",
//         method: "POST",
//         data: {
//             title: title.value,
//             text: textArea.value
//         }
//     });
// })

const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const text = document.querySelector('#blogBody').value.trim();
  
    if (title && text) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to post.');
      }
    }
};

document
.querySelector('.newBlogForm')
.addEventListener('submit', blogFormHandler);