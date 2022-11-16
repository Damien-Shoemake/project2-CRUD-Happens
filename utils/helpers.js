module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
      },
      validate_id: (value, operator, user) => {
        if (value === user) return `<button id='delete-comment' class='btn btn-danger' data-bs-toggle="tooltip" title="Are you sure you want to delete this comment?">
        Delete Comment</button>`
      }
}