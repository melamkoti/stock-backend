# BlogHub Backend API

A comprehensive backend system for BlogHub built with Node.js, Express.js, MongoDB, and AWS S3.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Post Management**: Full CRUD operations for blog posts
- **Image Upload**: AWS S3 integration for image storage
- **Admin Panel**: User management and analytics
- **Search & Filtering**: Advanced post search and filtering capabilities
- **Security**: Rate limiting, input validation, and security headers
- **Performance**: Compression, caching, and optimized database queries

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- AWS Account with S3 bucket configured

## Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/bloghub
   JWT_SECRET=your-super-secret-jwt-key-here
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET_NAME=your-s3-bucket-name
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database Setup**
   ```bash
   # Seed the database with sample data
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filters)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)

### Admin (Admin only)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/toggle-status` - Toggle user active status

### Upload
- `POST /api/upload/image` - Upload image to S3 (protected)

## AWS S3 Setup

1. **Create S3 Bucket**
   - Create a new S3 bucket in your AWS console
   - Configure bucket for public read access for uploaded images
   - Set up CORS policy for your frontend domain

2. **IAM User Setup**
   - Create an IAM user with S3 access permissions
   - Generate access keys for the user
   - Add the keys to your `.env` file

3. **Bucket Policy Example**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'admin'),
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Post Model
```javascript
{
  title: String,
  content: String,
  excerpt: String,
  image: String (S3 URL),
  imageKey: String (S3 key),
  tags: [String],
  author: ObjectId (ref: User),
  status: String (enum: 'draft', 'published', 'archived'),
  views: Number,
  likes: [ObjectId] (ref: User),
  publishedAt: Date,
  timestamps: true
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Controlled cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **File Upload Security**: File type and size validation

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Development

### Running Tests
```bash
npm test
```

### Code Linting
```bash
npm run lint
```

### Database Seeding
```bash
npm run seed
```

## Production Deployment

1. **Environment Variables**: Set all production environment variables
2. **Database**: Use MongoDB Atlas or similar cloud database
3. **AWS S3**: Configure production S3 bucket
4. **Process Manager**: Use PM2 or similar for process management
5. **Reverse Proxy**: Configure Nginx or similar
6. **SSL Certificate**: Set up HTTPS
7. **Monitoring**: Implement logging and monitoring

## API Documentation

For detailed API documentation with request/response examples, visit `/api/health` endpoint when the server is running.

## Default Users

After running the seed script, you can login with:

- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

## Support

For issues and questions, please check the documentation or create an issue in the repository.