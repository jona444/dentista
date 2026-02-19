import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenido" />

            <div className="container">
                <div className="row min-vh-100 align-items-center">
                    <div className="col-12">
                        <div className="text-center">
                            <h1 className="display-1 fw-bold text-primary mb-4">
                                Hola
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
