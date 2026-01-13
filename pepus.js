/* ================= DATA BUKU ================= */
const books = [
    { title: "Pemrograman Web", author: "Andi" },
    { title: "JavaScript Dasar", author: "Budi" },
    { title: "Desain UI/UX", author: "Citra" },
    { title: "Basis Data", author: "Dewi" }
];

const bookList = document.getElementById("bookList");

/* Tampilkan Buku */
function displayBooks(data) {
    bookList.innerHTML = "";
    data.forEach(book => {
        bookList.innerHTML += `
            <div class="card">
                <h4>${book.title}</h4>
                <p>Penulis: ${book.author}</p>
            </div>
        `;
    });
}
displayBooks(books);

/* Search Buku */
document.getElementById("searchInput").addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
    );
    displayBooks(filtered);
});

/* ================= AKUN ================= */
const accountForm = document.getElementById("accountForm");
const accountList = document.getElementById("accountList");

accountForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const account = {
        name: name.value,
        memberId: memberId.value,
        email: email.value
    };

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    loadAccounts();
    accountForm.reset();
});

function loadAccounts() {
    accountList.innerHTML = "";
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.forEach(acc => {
        accountList.innerHTML += `<li>${acc.name} (${acc.memberId})</li>`;
    });
}
loadAccounts();

/* ================= PEMINJAMAN ================= */
const loanForm = document.getElementById("loanForm");
const loanTable = document.getElementById("loanTable");

loanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loan = {
        name: borrowerName.value,
        book: bookTitle.value,
        loanDate: loanDate.value,
        returnDate: returnDate.value,
        status: "Dipinjam"
    };

    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    loans.push(loan);
    localStorage.setItem("loans", JSON.stringify(loans));

    loadLoans();
    loanForm.reset();
});

function loadLoans() {
    loanTable.innerHTML = "";
    let loans = JSON.parse(localStorage.getItem("loans")) || [];

    loans.forEach((loan, index) => {
        let lateInfo = "";
        if (loan.status === "Dipinjam") {
            const today = new Date().toISOString().split("T")[0];
            if (today > loan.returnDate) {
                lateInfo = " (Terlambat)";
            }
        }

        loanTable.innerHTML += `
            <tr>
                <td>${loan.name}</td>
                <td>${loan.book}</td>
                <td>${loan.loanDate}</td>
                <td>${loan.returnDate}</td>
                <td>${loan.status}${lateInfo}</td>
                <td>
                    ${loan.status === "Dipinjam" ? 
                    `<button onclick="returnBook(${index})">Kembalikan</button>` : "-"}
                </td>
            </tr>
        `;
    });
}

function returnBook(index) {
    let loans = JSON.parse(localStorage.getItem("loans"));
    loans[index].status = "Dikembalikan";
    localStorage.setItem("loans", JSON.stringify(loans));
    loadLoans();
}

loadLoans();

