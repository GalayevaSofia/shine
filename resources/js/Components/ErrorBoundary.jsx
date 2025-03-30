import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние чтобы показать запасной UI при следующем рендере
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку в консоль
    console.error("Ошибка отловлена границей ошибок:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Можно настроить запасной UI
      return (
        <div className="bg-red-100/10 border border-red-200/30 rounded-lg p-6 my-4">
          <h2 className="text-red-400 font-bold text-lg mb-2">Что-то пошло не так</h2>
          <details className="text-white/70 mb-2">
            <summary>Показать детали ошибки</summary>
            <p className="mt-2 text-red-300">{this.state.error && this.state.error.toString()}</p>
            <div className="mt-2 text-gray-400 text-sm overflow-auto max-h-32">
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </div>
          </details>
          <p className="text-white/90">
            Попробуйте{' '}
            <button 
              onClick={() => window.location.reload()} 
              className="text-purple-400 underline"
            >
              обновить страницу
            </button>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 