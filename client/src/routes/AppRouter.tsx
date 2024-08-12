import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Budget, NotFound } from '../pages'
import { UnauthenticatedRoute } from './UnauthenticatedRoute'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<UnauthenticatedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/budget' element={<Budget />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
