import type { FC } from 'react'

import { ROUTE_CONSTANTS } from '@shared/consts'
import { Route, Routes } from 'react-router'

import { NotFound } from '@pages/not-found'
import { HomePage } from '@pages/home'
import { ProductsPage } from '@pages/products'
import { Calls } from '@pages/calls'

export const Router: FC = () => (
  <Routes>
    <Route path="*" element={<NotFound />} />
    <Route path={ROUTE_CONSTANTS.HOME} element={<HomePage />} />
    <Route path={ROUTE_CONSTANTS.PRODUCT} element={<ProductsPage />} />
    <Route path={ROUTE_CONSTANTS.CALLS} element={<Calls />} />
    <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
  </Routes>
)
