export function Card({ children, className }) {
    return <div className={`p-5 rounded-lg shadow ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="border-b pb-2 mb-2">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h3 className="text-lg font-semibold">{children}</h3>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  