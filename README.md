# 🚀 Test Homeserver Microservices (FE -> BE1 -> BE2)

Dự án mẫu 3 tầng Microservice demo quy trình CI/CD tự động hóa trên Homeserver qua Coolify & GitHub Actions.

## 🏛️ Kiến trúc Gọi Dịch vụ:
```
[ Browser / Client ]
        │
        ▼
   [ Frontend (fe) ] (Nginx :80)
        │
        ▼ (Proxy /api/ -> http://be1:4001)
  [ Gateway (be1) ] (Node Express :4001)
        │
        ▼ (Internal call -> http://be2:4002/api/data)
   [ Core Service (be2) ] (Node Express :4002)
```

## 🚀 Cách Push lên GitHub:
```bash
cd /home/giakiet05/test-homeserver
git init
git add .
git commit -m "feat: initial microservices architecture with CI/CD"
# Tạo repo 'test-homeserver' trên GitHub, sau đó:
git remote add origin https://github.com/giakiet05/test-homeserver.git
git branch -M main
git push -u origin main
```
