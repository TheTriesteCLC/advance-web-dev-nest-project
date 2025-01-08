## API Documentation

API endpoints được sử dụng trong ứng dụng:

- Auth Service:

  - POST /api/auth/customer/login
  - POST /api/auth/employee/login
  - POST /api/auth/admin/login

- Transaction Service:

  - POST /api/transaction/internal-transfer
  - POST /api/transaction/external-transfer
  - GET /api/transaction/history

- Account Service:
  - GET /api/account/info
  - GET /api/account/balance

## Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

[MIT License](https://choosealicense.com/licenses/mit/)
