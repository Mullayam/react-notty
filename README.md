# React-Notty

A React toast notification library with positioning and promise compatibility.

## Installation

```sh
npm install react-notty
```

### Import

```tsx
import { ToastProvider } from "react-notty";
```

### Wrap Your Application Within The Provider

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

# Example Without Promise

```jsx
import { useToast } from "react-notty";

const App = () => {
  const { showToast } = useToast();

  return (
    <>
      <button onClick={() => showToast({ title: "Hello" })}>App</button>
    </>
  );
};

export default App;
```

### By Default it uses Default Notification,

![alt text](image.png)

### You can your own Custom notificaion Card Like this

```tsx
function TEST() {
  return (
    <div className="toast">
      <span>🔔</span>
      <div className="toast-content">
        <p className="toast-title">Default Notification</p>
        <p className="toast-description">This is a default toast message.</p>
      </div>
    </div>
  );
}
```

![alt text](image-1.png)

### Also in this Custom card You reciev the body via props and modify the body

```tsx
import { CardToastType } from "react-notty";

function TEST(props: CardToastType) {
  return (
    <div className="toast">
      <span>🔔</span>
      <div className="toast-content">
        <p className="toast-title">Default Notification</p>
        <p className="toast-description">This is a default toast message.</p>
      </div>
    </div>
  );
}
```

```typescript
type CardToastType = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
  action?: () => void;
  dismiss: () => void;
};
```
# Example With Promise

```jsx
import { useToast } from "react-notty";

const App = () => {
  const { showToast } = useToast();
 const fetchData = async () => {
    const data = await showPromiseToast(fetch("https://jsonplaceholder.typicode.com/posts/1"), { loading: "Loading", success: "Success", error: "Error" })
    // console.log(data)  //This will give you data for further use
  };
  return (
    <>
      <button onClick={fetchData}>App</button>
    </>
  );
};

export default App;
```