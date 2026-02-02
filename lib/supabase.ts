import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  client_name: string;
  event_date: string;
  location: string;
  image_url: string;
  thumbnail_url?: string;
  tags: string[];
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_en: string;
  name_ko: string;
  name_ja: string;
  icon: string;
  slug: string;
  count: number;
}

// API Functions
export const portfolioAPI = {
  // 포트폴리오 목록 가져오기 (필터, 페이징, 검색)
  async getAll(params: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'created_at' | 'views' | 'event_date';
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      category,
      page = 1,
      limit = 12,
      search,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = params;

    let query = supabase
      .from('portfolios')
      .select('*', { count: 'exact' });

    // 카테고리 필터
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // 검색
    if (search) {
      query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%,tags.cs.{${search}}`);
    }

    // 정렬
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // 페이징
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as Portfolio[],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    };
  },

  // 단일 포트폴리오 가져오기
  async getById(id: string) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*, portfolio_images(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    // 조회수 증가
    await supabase
      .from('portfolios')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', id);

    return data;
  },

  // Featured 포트폴리오 가져오기
  async getFeatured(limit = 6) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Portfolio[];
  },

  // 포트폴리오 생성 (관리자)
  async create(portfolio: Partial<Portfolio>) {
    const { data, error } = await supabase
      .from('portfolios')
      .insert(portfolio)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 포트폴리오 업데이트 (관리자)
  async update(id: string, portfolio: Partial<Portfolio>) {
    const { data, error } = await supabase
      .from('portfolios')
      .update({ ...portfolio, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 포트폴리오 삭제 (관리자)
  async delete(id: string) {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// 카테고리 API
export const categoryAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_en');

    if (error) throw error;
    return data as Category[];
  },

  async updateCount(slug: string) {
    const { count } = await supabase
      .from('portfolios')
      .select('*', { count: 'exact', head: true })
      .eq('category', slug);

    await supabase
      .from('categories')
      .update({ count: count || 0 })
      .eq('slug', slug);
  }
};

// 이미지 업로드 (Supabase Storage)
export async function uploadImage(file: File, folder: string = 'portfolios') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrl;
}
