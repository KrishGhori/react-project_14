#  Advanced React Counter App (Single-File Architecture)

An advanced React mini-project demonstrating **modern React concepts** such as Context API, custom hooks, memoization, lazy loading, and theme management — all implemented **cleanly inside the App layer** for simplicity and clarity.

This project is ideal for:
-  Resume projects  
-  College practicals  
-  Frontend interviews  
-  GitHub portfolio  

---

##  Features

-  **Dark / Light Mode** using Context API
-  **Reusable Custom Hook** (`useCounter`)
-  **Performance Optimization** with `useCallback` & `useMemo`
-  **Lazy Loading** using `React.lazy` & `Suspense`
-  **Single-File Architecture** (no unnecessary files)
-  Clean, responsive UI
-  Beginner-friendly yet interview-ready

---

##  Concepts Demonstrated

| Concept | Usage |
|------|------|
| Context API | Global theme state |
| Custom Hooks | Reusable counter logic |
| useCallback | Prevents unnecessary re-renders |
| useMemo | Optimizes derived state |
| React.lazy | Code splitting |
| Suspense | Fallback UI |
| Conditional Styling | Theme switching |

---

##  Project Structure

```text
src/
│── App.jsx        # Main application logic
│── App.css        # Styling (dark/light)
│── main.jsx       # React DOM entry point
│── index.css      # Global styles
```
# Install dependencies
```
npm install
```

# Start development server
```
npm run dev
```
---
## Future Enhancements (Optional)

Persist theme using localStorage
Add keyboard shortcuts
Convert to TypeScript
Add unit tests with Jest

Author
---
Krish Ghori
