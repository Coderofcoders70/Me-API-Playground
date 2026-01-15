# Database Schema (NoSQL - MongoDB)

This project uses MongoDB to store the candidate profile in a single document within the `profiles` collection.

## Collection: `profiles`

| Field | Type | Description |
| `name` | String | Full name of the candidate |
| `email` | String | Contact email address |
| `education` | String | Educational background |
| `skills` | Array [String] | List of technical skills |
| `projects` | Array [Object] | List of project details (title, desc, links) |
| `work` | Array [Object] | Professional work history |
| `links` | Object | Social links (GitHub, LinkedIn, Portfolio) |
| `timestamps` | Date | Automatically managed `createdAt` and `updatedAt` |

### Indexes
- `_id`: Primary Key (Default)
- A text index can be applied to `skills` and `projects.description` for optimized searching.