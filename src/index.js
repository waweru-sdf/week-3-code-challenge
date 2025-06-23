function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);

function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((posts) => {
      const postList = document.getElementById("my-post");

      posts.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.textContent = post.title;
        postItem.classList.add("my-post");

        // Add click listener for post detail view
        postItem.addEventListener("click", () => {
          handlePostClick(post.id);
        });

        postList.appendChild(postItem);
      });
    })
    .catch((error) => {
      console.error("Failed to fetch posts:", error);
    });
}
function handlePostClick(postId) {
  fetch(`http://localhost:3000/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      const postDetail = document.getElementById("post-detail");

      // Clear any previous content
      postDetail.innerHTML = "";

      // Create title element
      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title;

      // Create content element
      const contentElement = document.createElement("p");
      contentElement.textContent = post.content;

      // Create author element
      const authorElement = document.createElement("p");
      authorElement.textContent = `Author: ${post.author}`;

      // Append elements to the detail viewer
      postDetail.appendChild(titleElement);
      postDetail.appendChild(contentElement);
      postDetail.appendChild(authorElement);
    })
    .catch((error) => {
      console.error("Failed to fetch post details:", error);
    });
}
function addNewPostListener() {
  const form = document.getElementById("blog-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the form from refreshing the page

    // Get input values
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;

    // Create a new post object
    const newPost = {
      title: title,
      content: content,
      author: author
    };

    // Send the post to the server using POST
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(savedPost => {
      // Add the new post to the DOM (like in displayPosts)
      const postList = document.getElementById("my-post");

      const postItem = document.createElement("div");
      postItem.textContent = savedPost.title;
      postItem.classList.add("post-title");

      // Add click listener so you can view details
      postItem.addEventListener("click", () => {
        handlePostClick(savedPost.id);
      });

      postList.appendChild(postItem);

      // Optional: Clear form inputs after submission
      form.reset();
    })
    .catch(error => {
      console.error("Error adding post:", error);
    });
  });
}
