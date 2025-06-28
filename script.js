document.addEventListener('DOMContentLoaded', function() {
    const doctors = [
        {
            id: 1, // ID unik untuk identifikasi di backend
            name: "Dr. Budi Santoso, Sp.A",
            specialty: "Spesialis Anak",
            jobdesk: "Melakukan pemeriksaan, diagnosis, dan penanganan kesehatan anak mulai dari bayi hingga remaja. Memberikan vaksinasi, konsultasi tumbuh kembang, dan penanganan penyakit infeksi pada anak.",
            schedule: {
                "Senin": "09:00 - 12:00",
                "Rabu": "14:00 - 17:00",
                "Jumat": "09:00 - 12:00"
            }
        },
        {
            id: 2,
            name: "Dr. Siti Aminah, Sp.OG",
            specialty: "Spesialis Kandungan & Kebidanan",
            jobdesk: "Menyediakan layanan kesehatan wanita terkait kehamilan, persalinan, pasca-persalinan, masalah reproduksi, dan penyakit ginekologi. Melakukan pemeriksaan rutin dan USG.",
            schedule: {
                "Selasa": "10:00 - 13:00",
                "Kamis": "15:00 - 18:00",
                "Sabtu": "09:00 - 12:00"
            }
        },
        {
            id: 3,
            name: "Dr. Cahyo Nugroho, Sp.PD",
            specialty: "Spesialis Penyakit Dalam",
            jobdesk: "Mendiagnosis dan mengobati berbagai penyakit pada orang dewasa, termasuk penyakit jantung, diabetes, hipertensi, dan masalah pencernaan. Melakukan pemeriksaan kesehatan menyeluruh.",
            schedule: {
                "Senin": "14:00 - 17:00",
                "Rabu": "09:00 - 12:00",
                "Jumat": "14:00 - 17:00"
            }
        },
        {
            id: 4,
            name: "Dr. Dian Pratama, Sp.JP",
            specialty: "Spesialis Jantung & Pembuluh Darah",
            jobdesk: "Fokus pada pencegahan, diagnosis, dan pengobatan penyakit yang berkaitan dengan jantung dan pembuluh darah, seperti serangan jantung, gagal jantung, dan aritmia.",
            schedule: {
                "Selasa": "09:00 - 12:00",
                "Kamis": "09:00 - 12:00"
            }
        },
        {
            id: 5,
            name: "Dr. Rina Wati, Sp.M",
            specialty: "Spesialis Mata",
            jobdesk: "Mendiagnosis dan mengobati gangguan mata, melakukan koreksi penglihatan, serta tindakan bedah mata. Melayani pemeriksaan rutin dan penanganan katarak.",
            schedule: {
                "Rabu": "10:00 - 13:00",
                "Sabtu": "13:00 - 16:00"
            }
        }
    ];

    const doctorListDiv = document.getElementById('doctor-list');
    const reservationModal = document.getElementById('reservationModal');
    const closeButton = document.querySelector('.close-button');
    const modalDoctorName = document.getElementById('modalDoctorName');
    const reservationForm = document.getElementById('reservationForm');
    let selectedDoctorId = null; // Untuk menyimpan ID dokter yang dipilih

    // Fungsi untuk membuka modal reservasi
    function openReservationModal(doctorName, doctorId) {
        modalDoctorName.textContent = doctorName;
        selectedDoctorId = doctorId; // Simpan ID dokter
        reservationModal.style.display = 'block';
    }

    // Fungsi untuk menutup modal reservasi
    function closeReservationModal() {
        reservationModal.style.display = 'none';
        reservationForm.reset(); // Reset field form
        selectedDoctorId = null; // Reset ID dokter
    }

    // Loop melalui data dokter dan buat kartu dokter
    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.classList.add('doctor-card');

        let scheduleHtml = '';
        for (const day in doctor.schedule) {
            scheduleHtml += `<p><strong>${day}:</strong> ${doctor.schedule[day]}</p>`;
        }

        doctorCard.innerHTML = `
            <h3 class="doctor-name-clickable" data-doctor-name="${doctor.name}" data-doctor-id="${doctor.id}">${doctor.name}</h3>
            <p class="specialty">${doctor.specialty}</p>
            <p class="job-description">${doctor.jobdesk}</p>
            <div class="schedule">
                <h4>Jadwal Praktik:</h4>
                ${scheduleHtml}
            </div>
        `;
        doctorListDiv.appendChild(doctorCard);
    });

    // Event listener untuk membuka modal saat nama dokter diklik
    document.querySelectorAll('.doctor-name-clickable').forEach(nameElement => {
        nameElement.addEventListener('click', function() {
            const doctorName = this.dataset.doctorName;
            const doctorId = this.dataset.doctorId;
            openReservationModal(doctorName, doctorId);
        });
    });

    // Event listener untuk menutup modal
    closeButton.addEventListener('click', closeReservationModal);
    window.addEventListener('click', function(event) {
        if (event.target == reservationModal) {
            closeReservationModal();
        }
    });

    // Penanganan pengiriman formulir reservasi (INI ADALAH SIMULASI FRONTEND)
    // Untuk integrasi MySQL, Anda perlu MENGAKTIFKAN kode fetch() di bawah
    // dan menyiapkan file PHP di sisi server Anda.
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form default

        const doctorName = modalDoctorName.textContent;
        const patientName = document.getElementById('patientName').value;
        const reservationDate = document.getElementById('reservationDate').value;
        const reservationTime = document.getElementById('reservationTime').value;
        const patientPhone = document.getElementById('patientPhone').value;
        const patientEmail = document.getElementById('patientEmail').value;
        const notes = document.getElementById('notes').value;

        const reservationData = {
            doctor_id: selectedDoctorId, // Kirim ID dokter
            doctor_name: doctorName,
            patient_name: patientName,
            reservation_date: reservationDate,
            reservation_time: reservationTime,
            patient_phone: patientPhone,
            patient_email: patientEmail,
            notes: notes
        };

        console.log('Data Reservasi yang Akan Dikirim:', reservationData);

        // --- AKTIFKAN KODE INI UNTUK PENGIRIMAN DATA KE BACKEND PHP ---
        /*
        fetch('backend/reserve_doctor.php', { // Pastikan path ini benar sesuai struktur folder server Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reservasi Anda berhasil dikirim! Kami akan menghubungi Anda untuk konfirmasi.');
                closeReservationModal();
            } else {
                alert('Terjadi kesalahan saat mengirim reservasi: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Terjadi masalah koneksi. Silakan coba lagi nanti.');
        });
        */
        // --- AKHIR KODE UNTUK PENGIRIMAN DATA KE BACKEND PHP ---

        // Karena bagian fetch() di atas masih dikomentari, kita akan menampilkan alert simulasi
        alert(`Permintaan reservasi Anda dengan ${doctorName} pada ${reservationDate} pukul ${reservationTime} berhasil dikirim!\nTim kami akan menghubungi Anda melalui ${patientPhone} untuk konfirmasi.`);
        closeReservationModal();
    });
});