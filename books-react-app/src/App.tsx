import React from 'react';
import { AppRoutes } from './components/AppRoutes';
import DeleteModal from './components/DeleteModal';
import Layout from './components/Layout';
import Loader from './components/Loader';
import { useAppSelector } from './hooks/redux-hooks';
// Removed globalStyles.module.scss (now using Tailwind)

/**
 * Principle: favor small, cohesive, Tailwind-styled components; remove legacy SCSS gradually.
 */

const App: React.FC = () => {
    const { loading, modal } = useAppSelector(state => state.ui);

    return (
        <>
            {/* Global loader overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <Loader />
                </div>
            )}

            {/* Delete confirmation modal */}
            {modal.isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                    <DeleteModal />
                </div>
            )}

            <Layout>
                <AppRoutes />
            </Layout>
        </>
    );
};

export default App;