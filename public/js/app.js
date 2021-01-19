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
  
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const markdown = document.querySelector('#markdown').value.trim();

    if (title && description && markdown) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, description, markdown }),
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
.querySelector('.newForm')
.addEventListener('submit', blogFormHandler);