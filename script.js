document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const itemsPerPage = 5; // Number of products per page
    let currentIndex = 0;   // Start with the first page

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        sliderWrapper.innerHTML = ''; // Clear previous content
        const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        sliderWrapper.style.width = `${100 * totalPages}%`; // Set width based on total pages

        products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'slider-item';
            item.style.width = `${100 / (totalPages * itemsPerPage)}%`; // Set each product width
            item.style.margin = `10px`; // Add margin for better spacing
            item.innerHTML = `
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto;">
                <h3 style="font-size: 16px;">${product.title}</h3>
                <p style="font-size: 14px;">$${product.price}</p>
            `;
            sliderWrapper.appendChild(item);
        });

        updateSlider(); // Update slider after loading products
    }

    function updateSlider() {
        const totalItems = sliderWrapper.children.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total number of pages
        const offset = -(currentIndex * (100 / totalPages)); // Calculate the offset for the current page
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; // Go to the previous page
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalItems = sliderWrapper.children.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
        if (currentIndex < totalPages - 1) {
            currentIndex++; // Go to the next page
            updateSlider();
        }
    });

    fetchProducts();
});
