function callAPI(apiUrl) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi kết nối với API');
        }

        // Kiểm tra nếu phản hồi có dữ liệu JSON hoặc chỉ trả về mã trạng thái
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();  // Phân tích cú pháp JSON nếu có
        } else {
            return Promise.resolve();  // Không phân tích cú pháp nếu không phải JSON
        }
    })
    .then(data => {
        // Hiển thị thông báo khi thành công
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        notification.innerText = 'Bật thành công!';

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);

        if (data) {
            console.log('Kết quả từ API:', data);
        }
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        alert('Đã xảy ra lỗi khi gọi API.');
    });
}

function callAPIEverySecond(url) {
    setInterval(() => {
        callAPI(url);
    }, 1000); // Gọi API mỗi 1 giây (1000ms)
}

// Ví dụ sử dụng
callAPIEverySecond('https://fan-control.onrender.com/api/fan/refresh');