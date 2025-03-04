export function Table({ children, className }) {
    return <table className={`w-full border-collapse ${className}`}>{children}</table>;
  }
  
  export function TableHead({ children }) {
    return <thead className="bg-gray-200">{children}</thead>;
  }
  
  export function TableHeader({ children }) {
    return <th className="p-3 border">{children}</th>;
  }
  
  export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TableRow({ children }) {
    return <tr className="border-b">{children}</tr>;
  }
  
  export function TableCell({ children }) {
    return <td className="p-3 border">{children}</td>;
  }
  