const newsContainer = document.getElementById('news-container');
const newsForm = document.getElementById('news-form');
const newsTitle = document.getElementById('news-title');
const newsContent = document.getElementById('news-content');
let editingIndex = null;

// تحميل الأخبار من Local Storage عند بدء الصفحة
function loadNews() {
    const newsArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];
    newsContainer.innerHTML = '';
    newsArticles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-md-4 mb-4';
        articleDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.content}</p>
                    <button class="btn btn-warning" onclick="editArticle(${index})">تعديل</button>
                    <button class="btn btn-danger" onclick="deleteArticle(${index})">حذف</button>
                </div>
            </div>
        `;
        newsContainer.appendChild(articleDiv);
    });
}

// إضافة أو تحديث خبر جديد
newsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newArticle = {
        title: newsTitle.value,
        content: newsContent.value
    };

    const newsArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];

    if (editingIndex !== null) {
        // تحديث الخبر الموجود
        newsArticles[editingIndex] = newArticle;
        editingIndex = null; // إعادة تعيين فهرس التحرير
    } else {
        // إضافة خبر جديد
        newsArticles.push(newArticle);
    }

    localStorage.setItem('newsArticles', JSON.stringify(newsArticles));
    loadNews();
    newsForm.reset();
});

// تحرير مقالة
function editArticle(index) {
    const newsArticles = JSON.parse(localStorage.getItem('newsArticles'));
    newsTitle.value = newsArticles[index].title;
    newsContent.value = newsArticles[index].content;
    editingIndex = index; // تعيين فهرس التحرير
}

// حذف مقالة
function deleteArticle(index) {
    const newsArticles = JSON.parse(localStorage.getItem('newsArticles'));
    newsArticles.splice(index, 1); // حذف المقالة من المصفوفة
    localStorage.setItem('newsArticles', JSON.stringify(newsArticles));
    loadNews(); // إعادة تحميل الأخبار
}

// تحميل الأخبار عند بدء الصفحة
loadNews();
